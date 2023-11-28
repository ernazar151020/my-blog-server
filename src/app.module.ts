import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(), BlogModule],
})
export class AppModule {}
