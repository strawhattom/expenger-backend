import { Module } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { ExpenseResolver } from './expenses.resolver';
import { ExpenseController } from './expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './entities/expense.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema}])
  ],
  providers: [ExpenseResolver, ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
