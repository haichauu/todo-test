import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {
  CreateUser1682782422992,
  UserAddColIsVerified1682822953934,
  CreateVerification1682823680262,
  VerificationAddColDeletedAt1682824755997,
  VerificationIndexUserId1682841586493,
  CreateTodo1682844097628,
} from './migrations';
import { User, Verification } from '../entities';
import { Todo } from '../entities/task/todo.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Verification, Todo],
  migrations: [
    CreateUser1682782422992,
    UserAddColIsVerified1682822953934,
    CreateVerification1682823680262,
    VerificationAddColDeletedAt1682824755997,
    VerificationIndexUserId1682841586493,
    CreateTodo1682844097628,
  ],
  logging: Boolean(process.env.DB_LOGGING),
});
