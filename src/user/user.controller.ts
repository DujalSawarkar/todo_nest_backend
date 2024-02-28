import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto/create-todo.dto';
import { TodoService } from 'src/todo/todo.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UserEntity } from 'src/Entities/user.entity';
import { User } from 'src/auth/user.decorator';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto/update-todo.dto';
@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(private readonly todosevice: TodoService) {}
  @Post()
  async createtodo(@Body() CreateTodoDto: CreateTodoDto, user: UserEntity) {
    const todo = await this.todosevice.create(CreateTodoDto, user);

    return todo;
  }

  @Get()
  async getalltodos(@User() user: UserEntity) {
    console.log('usercontrollergetalltodos', user);
    const todos = await this.todosevice.getalltodos(user);
    console.log('usercontrollergetalltodos', todos);
    return todos;
  }

  @Get('/:id')
  async gettodosbyuser(@Param() id: number) {
    const todos = await this.todosevice.gettodosbyuser(id);
    console.log('usercontrollergettodosbyuser', todos);
    return todos;
  }

  @Put('/:id')
  async updatetodo(
    @Param('id') id: number,
    @Body() UpdateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.todosevice.updatetodo(id, UpdateTodoDto);
    console.log('usercontrollerupdatetodo', todo);
    return todo;
  }

  @Delete('/:id')
  async deletetodo(@Param('id') id: number) {
    const todo = await this.todosevice.deletetodo(id);
    console.log('usercontrollerdeletetodo', todo);
    return { message: 'Todo deleted', todo };
  }
}
