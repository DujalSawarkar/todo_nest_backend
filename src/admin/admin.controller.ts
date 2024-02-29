import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UserService } from 'src/user/user.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly userservice: UserService) {}

  @Get()
  async getuserbyid(@Param('id') id: number) {
    const user = await this.userservice.findUserById(id);
    console.log('usercontrollergetuserbyid', user);
    return user;
  }
}
