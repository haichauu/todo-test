import { Injectable } from '@nestjs/common';
import { EmailOptions, MailgunService } from '@nextnm/nestjs-mailgun';
import { mailgunConfig } from '../config';
import {forgotPasswordTemplate, verifyEmailTemplate} from '../helpers/mail.helpers';

@Injectable()
export class MailService {
  constructor(private mailgunService: MailgunService) {}

  private _getDefaultOption() {
    return {
      from: mailgunConfig().from,
    };
  }

  async sendEmail(options: EmailOptions) {
    await this.mailgunService.createEmail(mailgunConfig().domain, {
      ...options,
      ...this._getDefaultOption(),
    });
  }

  async sendmailForgotPassword(link: string, email: string) {
    try {
      const template = forgotPasswordTemplate(link);
      await this.sendEmail({
        to: email,
        html: template,
        subject: 'Reset password request',
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendVerifyEmail(link: string, email: string) {
    try {
      const template = verifyEmailTemplate(link);
      await this.sendEmail({
        to: email,
        html: template,
        subject: 'Verify your email',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
