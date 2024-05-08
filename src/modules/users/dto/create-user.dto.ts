import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in international format',
  })
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,}$/, {
    message: 'Password must contain at least one letter and one numeric digit',
  })
  password: string;
}
