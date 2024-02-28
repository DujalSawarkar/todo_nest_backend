import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CONSTANTS } from 'src/CONSTANTS';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strtegy';

@Module({
  imports: [
    PassportModule,
    UserModule
    ,
    JwtModule.register({
      secret: CONSTANTS.secretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
