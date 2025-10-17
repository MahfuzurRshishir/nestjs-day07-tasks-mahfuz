import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './interface/expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ExpenseService {
    private logger = new Logger(ExpenseService.name);

    constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) { }

    async create(dto: CreateExpenseDto): Promise<ResponsePayload> {
        try {
            const date = dto.date ? new Date(dto.date) : new Date();
            const created = new this.expenseModel({
                title: dto.title,
                amount: dto.amount,
                categoryId: dto.categoryId,
                date,
                note: dto.note ?? null,
            });
            const saved = await created.save();
            return { success: true, data: saved, message: 'Expense created' } as ResponsePayload;
        } catch (err) {
            this.logger.error(err);
            throw err;
        }
    }

    /**
     * list expenses with optional filters:
     * - month as YYYY-MM or YYYY-MM-DD (we extract year/month)
     * - categoryId
     */
    async findAll(
        pagination: PaginationDto,
        month?: string,
        categoryId?: string,
    ): Promise<ResponsePayload> {
        try {
            const page = pagination.page ?? 1;
            const limit = pagination.limit ?? 10;
            const skip = (page - 1) * limit;

            const filter: any = { isDeleted: false };

            if (categoryId) {
                filter.categoryId = categoryId;
            }

            if (month) {
                console.log('Filtering by month:', month);
                let year: number;
                let mon: number;

                if (month.includes('-')) {
                    // Format: YYYY-MM
                    const parts = month.split('-');
                    year = Number(parts[0]);
                    mon = Number(parts[1]) - 1;
                } else {
                    // Format: MM (defaults to current year)
                    const currentYear = new Date().getFullYear();
                    year = currentYear;
                    mon = Number(month) - 1;
                }

                const start = new Date(year, mon, 1);
                const end = new Date(year, mon + 1, 1);
                filter.date = { $gte: start, $lt: end };
            }


            const [data, count] = await Promise.all([
                this.expenseModel
                    .find(filter)
                    .populate('categoryId', 'name slug')
                    .sort({ date: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                this.expenseModel.countDocuments(filter),
            ]);

            return { success: true, data, count, message: 'Expenses fetched' } as ResponsePayload;
        } catch (err) {
            this.logger.error('Error fetching expenses:', err.message);
            console.error(err);
            throw new InternalServerErrorException('Failed to fetch expenses');
        }

    }
}
