import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String, default: 'era@gmail.com' })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ type: String, default: '1234' })
  password: string;
}
