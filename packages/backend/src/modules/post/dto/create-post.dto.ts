import { IsEmail } from 'class-validator';

export class CreatePostDto {
  @IsEmail()
  public readonly content: string;
}
