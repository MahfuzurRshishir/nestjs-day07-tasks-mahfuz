import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() dto: CreateExpenseDto): Promise<ResponsePayload> {
    return this.expenseService.create(dto);
  }

  // GET /expenses?month=2025-10&category=...&page=1&limit=20
  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @Query('month') month?: string,
    @Query('category') categoryId?: string,
  ): Promise<ResponsePayload> {
    console.log('Month:', month);
    console.log('Category ID:', categoryId);
    console.log('Pagination:', pagination);
    return this.expenseService.findAll(pagination, month, categoryId);
  }
}
