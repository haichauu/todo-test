import * as dotenv from 'dotenv';
dotenv.config();

export const mailgunConfig = () => {
  return {
    username: process.env.MAILGUN_USERNAME || 'api',
    key:
      process.env.MAILGUN_API_KEY ||
      'df543f47fb5b397e88e2058bcb6eba06-70c38fed-3ba3f316',
    domain:
      process.env.MAILGUN_DOMAIN ||
      'sandbox4eaf93dfcd53431593bbdd2aaa9dd550.mailgun.org',
    from:
      process.env.MAILGUN_FROM ||
      'Task Management <postmaster@sandbox4eaf93dfcd53431593bbdd2aaa9dd550.mailgun.org>',
  };
};
