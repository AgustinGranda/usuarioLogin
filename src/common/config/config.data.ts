import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: '0.0.0.0',
    port: 5433,
    username: 'postgres',
    password: 'abcd',
    database: 'users',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};
