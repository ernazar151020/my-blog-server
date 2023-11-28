import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@UsePipes(new ValidationPipe())
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log({ dto });
    return this.authService.register(dto);
  }

  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    console.log({ dto });
    return this.authService.login(dto);
  }
}
