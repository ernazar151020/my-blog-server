import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) throw new BadRequestException('User is already exist');

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    const tokens = await this.generateToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('Login or password incorrect');

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
    console.log({ isPasswordMatch });

    if (!isPasswordMatch)
      throw new BadRequestException('Login or password incorrect');

    const tokens = await this.generateToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async generateToken(userId: string) {
    const access_token = await this.jwtService.signAsync(
      { id: userId },
      {
        expiresIn: '1h',
      },
    );
    const refresh_token = await this.jwtService.signAsync(
      { id: userId },
      {
        expiresIn: '7d',
      },
    );
    return { access_token, refresh_token };
  }
}
