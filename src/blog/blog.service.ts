import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.prisma.blog.create({
      data: { ...createBlogDto },
    });

    return blog;
  }

  async findAll() {
    return this.prisma.blog.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
