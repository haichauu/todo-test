import * as dotenv from 'dotenv';
dotenv.config();
export const jwtConfigConstant = () => {
  return {
    secret: process.env.JWT_SECRET || 'localhost',
    signOptions: { expiresIn: '7d' },
  };
};
