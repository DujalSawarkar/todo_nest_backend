import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';

import { TodoEntity } from 'src/Entities/Todo.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, UserEntity])],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
