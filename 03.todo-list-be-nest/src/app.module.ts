import { Module } from '@nestjs/common';
import { typeORMConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      ...typeORMConfig,
      namingStrategy: new SnakeNamingStrategy()
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
