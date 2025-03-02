import { BadRequestException, Controller, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExpengerRequest  } from 'src/interfaces/jwt';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles, RolesGuard } from 'src/auth/role.guard';

@Controller('expenses')
export class ExpenseController {

    constructor(private expenseService: ExpenseService) {}

    @Get()
    @Roles(UserRole.ADMINISTRATOR)
    @UseGuards(AuthGuard, RolesGuard)
    async findAll() {
        return await this.expenseService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async findOne(@Param("id") id: string, @Req() request: ExpengerRequest) {

        if (id === "self") {
            return await this.findExpenseOfUser(request)
        }

        if (!request.user) {
            throw new BadRequestException();
        }

        return await this.expenseService.findOneWithUser(id, request.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createExpense(@Req() request: ExpengerRequest) {

        if (!request.body || !request.user) {
            throw new BadRequestException();
        }

        const input: CreateExpenseInput = {
            ...request.body,
            user: request.user.sub
        };

        return await this.expenseService.create(input);
    }

    @UseGuards(AuthGuard)
    @Get("self")
    async findExpenseOfUser(@Req() request: ExpengerRequest) {

        if (!request.user) {
            throw new UnauthorizedException();
        }

        return await this.expenseService.findAllFromUser(request.user.sub);
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async updateOne(@Param("id") id: string, @Req() request: ExpengerRequest) {

        if (!request.user) {
            throw new UnauthorizedException();
        }
        
        const isAdmin = request.user.role === UserRole.ADMINISTRATOR

        const input: UpdateExpenseInput = {
            ...request.body,
            id,
            user: request.user.sub
        };

        // If it's an admin, we force delete without changing the user
        if (isAdmin) {
            delete input.user;
            return await this.expenseService.forceUpdate(input);
        }

        return await this.expenseService.update(input);
    }
}
