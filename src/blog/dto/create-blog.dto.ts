import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ type: String })
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;

  @ApiProperty({ type: String })
  @IsString()
  image: string;

  @ApiProperty({ type: String })
  @IsString()
  authorId: string;

  @ApiProperty({
    type: [String],
    description: 'Array of strings',
    example: ['apple', 'banana', 'cherry'],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tags: string[];
}
