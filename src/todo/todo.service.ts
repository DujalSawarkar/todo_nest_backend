import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/Entities/Todo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto/update-todo.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private userentity: Repository<UserEntity>,
  ) {}
  private readonly userservice: UserService;
  //create
  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: TodoEntity = new TodoEntity();
    todo.title = createTodoDto.title;
    todo.content = createTodoDto.content;
    todo.todostatus;

    console.log('userId', userId);
    todo.user = await this.userentity.findOne({
      where: { id: userId },
    });

    return this.todoRepository.save(todo);
  }

  async getalltodos(user: UserEntity) {
    const query = this.todoRepository.createQueryBuilder('todo');
    query.where('todo.user = :user', { user: user.id });
    let todos;
    try {
      todos = await query.getMany();
    } catch (err) {
      throw new NotFoundException('Error in fetching todos');
    }
    console.log('todos', todos);
    return todos;
  }
  async gettodosbyuser(userid: number): Promise<TodoEntity[]> {
    let user = await this.userentity.findOne({
      where: { id: userid },
    });
    return this.todoRepository.find({ where: { user: user } });
  }

  async updatetodo(id: number, updateTodoDto: UpdateTodoDto) {
    const partialTodo: Partial<TodoEntity> = {
      title: updateTodoDto.title,
      content: updateTodoDto.content,
      todostatus: true,
    };

    const todo = await this.todoRepository.update(id, partialTodo);

    return todo;
  }

  async deletetodo(id: number) {
    const todo = await this.todoRepository.find({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    await this.todoRepository.remove(todo);
    return todo;
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, todostatus: false },
    });
  }

  findAllTodoByUserCompleted(userId: number) {
    // userid not completed
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, todostatus: true },
    });
  }
}
