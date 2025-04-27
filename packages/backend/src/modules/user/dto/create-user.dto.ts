import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    },
  )
  public readonly email: string = '';

  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(8, {
    message: 'Password must be min 8 symbols',
  })
  public readonly password: string;

  @IsString({
    message: 'Invalid name',
  })
  public readonly name: string;

  @IsString({
    message: 'Invalid picture url',
  })
  public readonly picture: string;
}
