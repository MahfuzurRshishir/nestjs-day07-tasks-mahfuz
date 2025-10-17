import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { log } from 'console';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() dto: CreateCategoryDto): Promise<ResponsePayload> {
    console.log('DTO:', dto);
    return this.categoryService.create(dto);
  }

  @Get()
  async getAll(@Query() pagination: PaginationDto): Promise<ResponsePayload> {
    return this.categoryService.findAll(pagination);
  }
}
