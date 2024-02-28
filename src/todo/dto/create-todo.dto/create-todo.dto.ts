import { TodoStatus } from 'src/Entities/Todo.entity';

export class CreateTodoDto {
  title: string;

  content: string;
  status: TodoStatus;
  user: number;
}
