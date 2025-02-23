/**
 * Nest Modules
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * DB Modules
 */
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ExpenseModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL || "")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
