import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthHelper } from './helper/auth.helper';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/auth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/users.entity';

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