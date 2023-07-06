import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from './home.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'fitnesstracker',
      entities: [__dirname + './**/*.entity.ts'],
      migrations: ["./migrations/*{.ts}"],
      autoLoadEntities: true,
      synchronize: false
    }),
    UsersModule
  ],
  controllers: [AppController, HomeController],
  providers: [AppService],
})

export class AppModule { }
