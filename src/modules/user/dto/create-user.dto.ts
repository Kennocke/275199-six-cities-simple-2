import { IsEmail, IsString, Length } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'Email must be vallid address'})
  public email!: string;

  public avatarPath!: string;

  @IsString({message: 'Name is required'})
  @Length(1, 15, {message: 'Name length must be between 1 and 15'})
  public name!: string;

  @IsString({message: 'Password is required'})
  @Length(6, 12, {message: 'Password length must be between 1 and 15'})
  public password!: string;
  public type!: UserType;
}
