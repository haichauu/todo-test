import * as dotenv from 'dotenv';
dotenv.config();
export const feWebConfig = () => {
  return {
    url: process.env.FE_WEB_LINK || 'http://0.0.0.0:3001',
  };
};
