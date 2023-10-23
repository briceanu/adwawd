import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  todo: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isEditing: boolean;
}
