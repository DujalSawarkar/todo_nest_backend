import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';
import { UserService } from './user/user.service';
import { create } from 'domain';
import { CreateUserDto } from './user/dto/create-user.dto/create-user.dto';

@Controller('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    console.log('appcontrollerlogin', req.user);
    let user = req.user;

    // remove user.password;
    delete user.password;

    // const user = "dbhfgijdebgjhd";
    const tokken = await this.authService.generateToken(user);
    console.log('appcontrollerlogintoken', tokken, user.role);
    return { token: tokken, role: user.role };
  }

  @Post('/register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    console.log('appcontrollerregister', CreateUserDto);
    const user = await this.userService.getuser(CreateUserDto.email);
    console.log('appcontrollerregisteruser', user);
    if (user == null) {
      let newUser = await this.userService.createuser(CreateUserDto);
      console.log('appcontrollerregisternewuser', newUser);
      // delete newUser.password;
      return newUser;
    } else {
      return 'User already exists';
    }
  }
}
