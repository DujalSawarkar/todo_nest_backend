import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { TodoEntity } from './Entities/Todo.entity';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dujal',
      database: 'todo_db',
      entities: [UserEntity, TodoEntity],
      synchronize: true,
      // dropSchema: true,
    }),
    TodoModule,
    AuthModule,
    UserModule,
    UserEntity,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
