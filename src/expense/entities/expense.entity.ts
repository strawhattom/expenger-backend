/**
 * Expense entity
 */
export class Expense {
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

    /**
     * Date
     */
    createdAt: Date

    /**
     * Expense metadata
     */
    metadata?: ExpenseMetadata[]
}

/**
 * Expense type.
 */
export enum ExpenseType {
    PURCHASE,
    SUBSCRIPTION,
    WITHDRAW
}

/**
 * Expense periodicity suffix
 */
export enum ExpensePeriodicity {
    YEARLY = "y",
    MONTHLY = "m",
    WEEKLY = "w",
    DAILY = "d"
}

/**
 * Expense meta data
 */
export type ExpenseMetadata = {
    /**
     * Alias of the expense
     */
    alias?: string;

    /**
     * Tag list (can be used for filtering)
     */
    tags?: string[];

    /**
     * Origin of the expense (i.e. Netflix)
     */
    origin?: string;

    /**
     * Currency
     */
    currency?: string;

    /**
     * Category (can be used for filtering or sorting)
     */
    category?: string;

    /**
     * Periodicity
     * 
     * e.g "1m"
     */
    periodicity?: string;
}