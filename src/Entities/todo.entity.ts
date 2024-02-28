import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 'OPEN' })
  status: TodoStatus;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;

}

export enum TodoStatus {
  OPEN = 'OPEN',

  completed = 'completed',
}
