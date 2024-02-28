import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import * as brypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.getuser(email);
    if (user === undefined || user == null) throw new UnauthorizedException();
    const isMatch = await brypt.compare(password, user.password);
    if (user != undefined && isMatch) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
