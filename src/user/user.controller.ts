import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto/create-todo.dto';
import { TodoService } from 'src/todo/todo.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UserEntity } from 'src/Entities/user.entity';
import { User } from 'src/auth/user.decorator';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto/update-todo.dto';
import { Request } from 'express';
@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(private readonly todo: TodoService) {}

  @Post()
  async createtodo(@Body() CreateTodoDto: CreateTodoDto, @Req() req: Request) {
    let token = (
      req.headers as { authorization?: string }
    )?.authorization?.replace('Bearer ', '');
    if (token) {
      // Do something with the token if needed
      console.log('JWT token:', token);
    }
    return this.todo.create(CreateTodoDto, (req.user as UserEntity).id);
  }

  @Get()
  async getalltodos(@User() user: UserEntity) {
    console.log('usercontrollergetalltodos', user);
    const todos = await this.todo.getalltodos(user);
    console.log('usercontrollergetalltodos', todos);
    return todos;
  }

  @Get('/:id')
  async gettodosbyuser(@Param() id: number) {
    const todos = await this.todo.gettodosbyuser(id);
    console.log('usercontrollergettodosbyuser', todos);
    return todos;
  }

  @Put('/:id')
  async updatetodo(
    @Param('id') id: number,
    @Body() UpdateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.todo.updatetodo(id, UpdateTodoDto);
    console.log('usercontrollerupdatetodo', todo);
    return todo;
  }

  @Delete('/:id')
  async deletetodo(@Param('id') id: number) {
    const todo = await this.todo.deletetodo(id);
    console.log('usercontrollerdeletetodo', todo);
    return { message: 'Todo deleted', todo };
  }

  @Get('/notcompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.todo.findAllTodoByUserNotCompleted(userId);
  }

  @Get('/completed/:userId')
  findAllTodosByUserIdCompleted(@Param('userId') userId: number) {
    return this.todo.findAllTodoByUserCompleted(userId);
  }
}
