import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId, HydratedDocument } from "mongoose"

/**
 * Expense type.
 */
export enum ExpenseType {
    PURCHASE = "purchase",
    INVESTMENT = "investment",
    SUBSCRIPTION = "subscription",
    WITHDRAW = "withdraw"
}

export type ExpenseDocument = HydratedDocument<Expense>

/**
 * Expense meta data
 */
export class ExpenseMetadata {
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

export const ExpenseMetadataSchema = SchemaFactory.createForClass(ExpenseMetadata, );

/**
 * Expense entity
 */
@Schema()
export class Expense {
    /**
     * User id
     */
    @Prop({required: true, type: String, immutable: true})
    user: String
    /**
     * Expense name
     */
    name?: String
    /**
     * Expense type
     */
    @Prop({required: true, default: ExpenseType.PURCHASE, enum: ExpenseType})
    type: ExpenseType
    /**
     * Quantity (default 1)
     */
    @Prop({required: true})
    quantity?: number = 1
    /**
     * Price (default 0)
     */
    @Prop({required: true})
    price?: number = 0
    /**
     * Description
     */
    description?: string

    /**
     * First expense (default today)
     */
    @Prop({required: true, default: Date.now, immutable: false})
    expenseDate: Date

    /**
     * Date
     */
    @Prop({required: true, default: Date.now, immutable: true})
    createdAt: Date

    /**
     * Expense metadata
     */
    @Prop({type: ExpenseMetadataSchema, default: {}, _id: false})
    metadata?: ExpenseMetadata
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);


/**
 * Expense periodicity suffix
 */
export enum ExpensePeriodicity {
    YEARLY = "y",
    MONTHLY = "m",
    WEEKLY = "w",
    DAILY = "d"
}
