import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  catchError,
  finalize,
  Observable,
  throwError,
  TimeoutError,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../logger/logger';
import { formatJsonDataToString, maskLog } from './utils';
const myLogger = Logger('App');

export interface Result<T> {
  data: T;
  message: string;
}

const IGNORE_RESPONSE_URLS = [];

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Result<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Result<T>> {
    const now = Date.now();

    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const { method, path, query, body } = request || {};

    const user = request['user']
      ? `AuthenticatedUser(${request['user']['email']})`
      : 'AnonymousUser()';

    const log = {
      method,
      path,
      query: formatJsonDataToString(query || {}),
      body: formatJsonDataToString(body || {}),
      user,
      is_error: false,
      response_status: 200,
      response_content: undefined,
      duration: '',
    };

    return next.handle().pipe(
      finalize(async () => {
        delete log.is_error;
        log.duration = `${Date.now() - now}ms`;
        const formattedLog = maskLog(log);
        myLogger.log({
          level: 'info',
          message: Object.keys(formattedLog)
            .map((key) => `${key}=${formattedLog[key]}`)
            .join(' | '),
        });
      }),
      map((data) => {
        // NOTE: do not modify response_content
        const response_content = {
          message: 'Success',
          data,
          path: request.url,
        };
        if (IGNORE_RESPONSE_URLS.includes(request.path)) {
          data = 'SUCCESS BUT TOO LONG TO DISPLAY...';
          log.response_content = { ...response_content, data };
        } else {
          log.response_content = response_content;
        }
        return response_content;
      }),
      catchError((err) => {
        log.is_error = true;
        log.response_status = err.status;
        if (err.response) err.response.path = request.url;
        try {
          log.response_content = JSON.stringify(err.response) || err.message;
        } catch (e) {
          myLogger.log({
            level: 'info',
            message: 'Can not stringify err.response',
          });
        }
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
