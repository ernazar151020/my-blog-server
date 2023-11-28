import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: [CreateUserDto] })
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
