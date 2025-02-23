import { ExpenseType, ExpenseMetadata } from "../entities/expense.entity"
/**
 * Describe an expense's input
 */
export class CreateExpenseInput {
    /**
     * User id
     */
    user: number
    /**
     * Expense name
     */
    name?: String
    /**
     * Expense type
     */
    type: ExpenseType
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
    metadata?: ExpenseMetadata[]
}
