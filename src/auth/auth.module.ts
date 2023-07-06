import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            secret: config.get('JWT_KEY'),
            signOptions: { expiresIn: config.get('JWT_EXPIRES') },
        }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy, ConfigService],
})
export class AuthModule {}