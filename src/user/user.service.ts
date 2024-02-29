import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TodoService } from 'src/todo/todo.service';
import { Body, Post } from '@nestjs/common';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto/create-todo.dto';
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly todoService: TodoService,
  ) {}
  async getuser(email: string) {
    let user = await this.userRepository.findOne({ where: { email: email } });

    console.log(user);
    return user;
  }
  async createuser(CreateUserDto: CreateUserDto) {
    let user = new UserEntity();
    user.email = CreateUserDto.email;
    user.name = CreateUserDto.name;
    user.password = await bcrypt.hash(CreateUserDto.password, saltRounds);
    user.role = CreateUserDto.role;
    user = await this.userRepository.save(user);
    console.log('user', user);
    return user;
  }
  async findUserById(id: number) {
    let user = await this.userRepository.findOne({ where: { id: id } });
    console.log('user', user);
    return user;
  }

  async getallusers() {
    const users = await this.userRepository.find();
    console.log('users', users);
    return users;
  }

  async deleteuser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({ id: id });
    return user;
  }
}
