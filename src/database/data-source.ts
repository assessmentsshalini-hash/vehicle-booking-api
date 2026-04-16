import * as dotenv from 'dotenv';
import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,

  entities: [join(__dirname, 'src/**/*.entity.ts')],
  migrations: [join(__dirname, 'src/migrations/*.ts')],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: true,
});
