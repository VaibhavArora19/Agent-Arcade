import { IsNotEmpty, IsString } from 'class-validator';

export enum SDK {
  AGENT_KIT = 'agent-kit',
  WARDEN = 'warden',
  COVALENT = 'covalent',
}

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  agentName: string;

  @IsString()
  @IsNotEmpty()
  agentDescription: string;

  @IsString()
  @IsNotEmpty()
  sdk: SDK;

  @IsString()
  @IsNotEmpty()
  chain: string;

  //!figure out how to add tasks
  @IsString()
  @IsNotEmpty()
  task: string;
}
