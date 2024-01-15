import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

// if (process.env.NODE_ENV === 'local') {
dotenv.config({ path: './env/local.env' });
// }

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  // migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

console.log(__dirname);

export default registerAs('typeorm', () => typeOrmConfig);
export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
