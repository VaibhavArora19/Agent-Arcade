import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateZeeDto {
  @IsString()
  @IsNotEmpty()
  zeeName: string;

  @IsString()
  @IsNotEmpty()
  zeeDescription: string;

  @IsString()
  @IsNotEmpty()
  zeeGoal: string;

  @IsArray()
  @IsNotEmpty()
  agents: Array<string>;
}
