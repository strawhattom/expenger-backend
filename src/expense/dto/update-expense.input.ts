import { CreateExpenseInput } from './create-expense.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateExpenseInput extends PartialType(CreateExpenseInput) {
  id: number;
}
