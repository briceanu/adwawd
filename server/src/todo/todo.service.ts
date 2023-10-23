import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}
  create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  findAll(user: User): Promise<Todo[]> {
    return this.todoRepository.getTodos(user);
  }

  async getTodoById(id: string, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id, user } });
    if (!todo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    return todo;
  }

  async update(id: string): Promise<Todo> {
    const update = await this.todoRepository.findOne({ where: { id } });
    if (!update) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    update.completed = !update.completed;
    await this.todoRepository.save(update);
    return update;
  }
  //
  async updateEdit(id: string): Promise<Todo> {
    const update = await this.todoRepository.findOne({ where: { id } });
    if (!update) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    update.isEditing = !update.isEditing;
    if (update.completed === true) {
      update.completed = false;
    }
    await this.todoRepository.save(update);
    return update;
  }
  //
  async updateTodo(id: string, todo: string, user: User): Promise<Todo> {
    const userTodo = await this.todoRepository.findOne({ where: { id, user } });
    if (!userTodo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    userTodo.todo = todo;
    userTodo.isEditing = !userTodo.isEditing;
    await this.todoRepository.save(userTodo);
    return userTodo;
  }

  async remove(id: string, user: User): Promise<void> {
    const result = await this.todoRepository.delete({
      id: id.toString(),
      user,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with if ${id} not found`);
    }
    return;
  }
}
