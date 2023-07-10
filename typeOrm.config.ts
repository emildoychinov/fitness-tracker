import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/common/entity/users.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'fitnesstracker',
  entities: ['dist/src/**/common/entity/**.entity.js'],
  migrations: ['dist/src/migrations/*.js']
});