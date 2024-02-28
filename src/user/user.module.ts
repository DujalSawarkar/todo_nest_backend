import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from 'src/Entities/user.entity';
import { UserService } from './user.service';
import { TodoEntity } from 'src/Entities/Todo.entity';

import { AuthModule } from 'src/auth/auth.module';
import { LocalStrategy } from 'src/auth/local.strategy';
import { Repository } from 'typeorm';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TodoEntity,LocalStrategy]),TodoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {

}
