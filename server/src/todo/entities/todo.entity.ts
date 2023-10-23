import { Exclude } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todo: string;

  @Column()
  completed: boolean;

  @Column()
  isEditing: boolean;

  // this line of code( many todos are owned by one user)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.todos, { eager: false })
  //when we return the json response we exclude the user object
  @Exclude({
    toPlainOnly: true,
  })
  user: User;
}
