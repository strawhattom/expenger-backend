import { ObjectId } from "mongoose"
import { ExpenseType, ExpenseMetadata } from "../entities/expense.entity"
/**
 * Describe an expense's input
 */
export class CreateExpenseInput {
    /**
     * User id
     */
    user?: string | ObjectId
    /**
     * Expense name
     */
    name?: String
    /**
     * Expense type
     */
    type?: ExpenseType
    /**
     * Quantity (default 1)
     */
    quantity?: number = 1
    /**
     * Price (default 0)
     */
    price?: number = 0
    /**
     * Description
     */
    description?: string

    /**
     * Date
     */
    createdAt?: Date

    /**
     * Metadata
     */
    metadata?: ExpenseMetadata
}
