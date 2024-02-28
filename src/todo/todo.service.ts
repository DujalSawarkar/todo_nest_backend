import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from 'src/Entities/Todo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private userentity: Repository<UserEntity>,
  ) {}
  //create
  async create(createTodoDTO: CreateTodoDto, user: UserEntity) {
    const todo = new TodoEntity();
    const { title, content } = createTodoDTO;
    todo.title = title;
    todo.content = content;
    todo.status = TodoStatus.OPEN;
    const foundUser = await this.userentity.findOne({
      where: { id: createTodoDTO.user },
    });
    console.log('foundUser', foundUser);
    todo.user = foundUser;
    await this.todoRepository.save(todo);
    return todo;
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
      status: updateTodoDto.status,
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
}
