import { IsNotEmpty, IsString } from 'class-validator';

export class CommunicateDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;
}
