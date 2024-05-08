import { Exclude } from 'class-transformer';

// What to exclude as a response from a user entity
export class ExcludeUserPropsDto {
  @Exclude()
  password: string;

  @Exclude()
  emailVerificationToken: string;

  @Exclude()
  emailVerificationTokenExpires: Date;
}
