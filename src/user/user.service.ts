import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User is already exists');
    }

    await this.prisma.user.create({
      data: { ...createUserDto },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
