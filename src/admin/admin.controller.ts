import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UserService } from 'src/user/user.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly userservice: UserService) {}

  @Get('/:id')
  async getuserbyid(@Param('id') id: number) {
    const user = await this.userservice.findUserById(id);
    console.log('usercontrollergetuserbyid', user);
    return user;
  }

  @Get()
  async getallusers() {
    const users = await this.userservice.getallusers();
    console.log('usercontrollergetallusers', users);
    return users;
  }

  @Delete('/:id')
  async deleteuser(@Param('id') id: number) {
    const user = await this.userservice.deleteuser(id);
    console.log('usercontrollerdeleteuser', user);
    return user;
  }
}
