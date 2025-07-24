import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
