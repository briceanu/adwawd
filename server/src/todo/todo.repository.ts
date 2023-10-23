import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from 'src/auth/entities/user.entity';

export class TodoRepository extends Repository<Todo> {
  constructor(
    @InjectRepository(Todo)
    private usersRepository: Repository<Todo>,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  async getTodos(user: User): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');
    query.where({ user });
    const todos = await query.getMany();
    return todos;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { todo, completed, isEditing } = createTodoDto;
    const saveTodo = this.create({
      todo,
      completed,
      isEditing,
      user,
    });

    await this.save(saveTodo);
    return saveTodo;
  }
}
