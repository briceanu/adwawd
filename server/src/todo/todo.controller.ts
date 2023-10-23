import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { GetDataInterceptor } from 'src/get-data.interceptor';

@UseGuards(AuthGuard())
@UseInterceptors(new GetDataInterceptor())
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // maieadw
  // 222!!DDw

  @Post('/save')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, user);
  }

  @Get('/todos')
  findAll(@GetUser() user: User): Promise<Todo[]> {
    return this.todoService.findAll(user);
  }

  @Get('/:id')
  findOne(@Param('id') id: string, user: User): Promise<Todo> {
    return this.todoService.getTodoById(id, user);
  }

  @Put('/:id')
  update(@Param('id') id: string): Promise<Todo> {
    return this.todoService.update(id);
  }
  @Put('/update/:id')
  updateEdit(@Param('id') id: string): Promise<Todo> {
    return this.todoService.updateEdit(id);
  }
  @Put('/updateTodo/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() todo: string,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, todo, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.todoService.remove(id, user);
  }
}
