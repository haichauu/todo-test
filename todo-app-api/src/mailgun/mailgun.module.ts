import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { mailgunConfig } from '../config';
import { MailService } from './mailgun.service';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return mailgunConfig();
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
