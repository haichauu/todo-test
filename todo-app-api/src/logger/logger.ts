import * as winston from 'winston';

export const Logger = (service) => {
  return winston.createLogger({
    defaultMeta: { service: service },

    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'log' }),
    ],
  });
};
