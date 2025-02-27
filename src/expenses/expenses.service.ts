import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseDocument } from './entities/expense.entity';
import { Error, Model, ObjectId } from 'mongoose';

/**
 * Update Filter
 */
type UpdateFilter = {
  _id: string;
  user?: string | ObjectId;
}

/**
 * ExpenseService
 */
@Injectable()
export class ExpenseService {

  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {};

  /**
   * Creates one expense
   * 
   * @param createExpenseInput Inputs
   * @returns ExpenseDocument
   * @throws `BadRequestException` if an error occured
   * @throws `InternalServerErrorException` if an error occured while saving
   */
  async create(createExpenseInput: CreateExpenseInput): Promise<ExpenseDocument> {
    try {
      const expense = new this.expenseModel(createExpenseInput);
      return await expense.save();
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new BadRequestException(e.message)
      }
      throw new InternalServerErrorException("Something went wrong...");
    }
  }

  /**
   * Find all expenses
   * 
   * @returns ExpenseDocument[]
   */
  async findAll(): Promise<ExpenseDocument[]> {
    return await this.expenseModel.find().exec();
  }

  /**
   * Find one expense
   * 
   * @param id expense id
   * @returns ExpenseDocument
   * @throws `NotFoundException` if not found
   */
  async findOne(id: string): Promise<ExpenseDocument> {
    const expense = await this.expenseModel.findOne({_id: id}).exec();
    if (!expense) {
      throw new NotFoundException("Could not find expense " + id);
    }
    return expense;
  }

  /**
   * Find an expense from a user
   * 
   * @param id expense id
   * @param userId user id
   * @returns ExpenseDocument
   * @throws `BadRequestException` if not found
   */
  async findOneWithUser(id: string, userId: string | ObjectId): Promise<ExpenseDocument> {
    const expense = await this.expenseModel.findOne({_id: id, user: userId}).exec()
    if (!expense) {
      throw new NotFoundException("Could not find expense " + id + " for user " + userId);
    }
    return expense;
  }

  /**
   * Find all expenses from a user
   * 
   * @param userId user id
   * @returns `ExpenseDocument[]`
   */
  async findAllFromUser(userId: string | ObjectId): Promise<ExpenseDocument[]> {
    return await this.expenseModel.find({user: userId}).exec();
  }
  
  /**
   * Force an update (from admin)
   * 
   * @param updateExpenseInput Input
   * @returns Expense
   */
  async forceUpdate(updateExpenseInput: UpdateExpenseInput): Promise<ExpenseDocument> {
    return await this.#conditionalUpdate(updateExpenseInput, false);
  };

  /**
   * Update an expense (from user)
   * 
   * @param updateExpenseInput Input
   * @returns Expense
   */
  async update(updateExpenseInput: UpdateExpenseInput): Promise<ExpenseDocument> {
    return await this.#conditionalUpdate( updateExpenseInput, true);
  }

  // TODO
  remove(id: number) {
    return `This action removes a #${id} expense`;
  }

  /**
   * Conditional update on an expense
   * 
   * @param input Inputs
   * @param fromUser adds the user id to the filter to find the expense
   * @returns Expense
   * @throws `NotFoundException` if not found
   * @throws `BadRequestException` if inputs are incorrect
   */
  async #conditionalUpdate(input: UpdateExpenseInput, fromUser: boolean): Promise<ExpenseDocument> {
    const filter: UpdateFilter = {_id: input.id}

    /**
     * Add the the user to the filter to find the expense.
     */
    if (fromUser) {
      filter.user = input.user;
    }

    try {
      // Prevent updating expense's user and creation date
      const expense = await this.expenseModel.findOne(filter).exec();
      if (!expense) {
        throw new NotFoundException("Could not find expense with id " + input.id + " for user " + input.user);
      }
      return expense.set(input).save();
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        throw new BadRequestException(e.message)
      }
      throw new BadRequestException("Something went wrong... : " + e.message);
    }
  }
}
