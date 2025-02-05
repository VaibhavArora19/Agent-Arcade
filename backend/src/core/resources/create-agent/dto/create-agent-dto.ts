import { IsNotEmpty, IsString } from 'class-validator';

export enum SDK {
  AGENT_KIT = 'agent-kit',
  WARDEN = 'warden',
  COVALENT = 'covalent',
}

export enum TYPE {
  SOCIAL = 'social',
  DEFI = 'defi',
  GAME = 'game',
  AI_COMPANION = 'ai-companion',
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

  @IsString()
  @IsNotEmpty()
  agentType: TYPE;

  //!figure out how to add tasks
  @IsString()
  @IsNotEmpty()
  task: string;
}
