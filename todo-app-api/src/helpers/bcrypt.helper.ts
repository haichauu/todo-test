import * as bcrypt from 'bcryptjs';
import { HttpException } from '@nestjs/common';

export const createBcryptHash = async (data: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(data, salt);
};

export const compareBcryptHash = async (
  value1: string,
  value2: string,
  err?: HttpException,
) => {
  const isValid = await bcrypt.compare(value1, value2);
  if (!isValid && err) {
    throw err;
  }
  return isValid;
};
