import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ type: String, example: 'test' })
  password: string;
}
