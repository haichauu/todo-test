import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = () => {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.DB_ENTITIES],
    synchronize: false,
    logging: Boolean(process.env.DB_LOGGING),
  };
};
