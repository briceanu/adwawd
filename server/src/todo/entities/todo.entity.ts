import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todo: string;

  @Column()
  completed: boolean;

  @Column()
  idEditing: boolean;
}
