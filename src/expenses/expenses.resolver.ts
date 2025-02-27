import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExpenseService } from './expenses.service';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';

@Resolver('Expense')
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation('createExpense')
  create(@Args('createExpenseInput') createExpenseInput: CreateExpenseInput) {
    return this.expenseService.create(createExpenseInput);
  }

  @Query('expense')
  findAll() {
    return this.expenseService.findAll();
  }

  @Query('expense')
  findOne(@Args('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Mutation('updateExpense')
  update(@Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput) {
    return this.expenseService.update(updateExpenseInput);
  }

  @Mutation('removeExpense')
  remove(@Args('id') id: number) {
    return this.expenseService.remove(id);
  }
}
