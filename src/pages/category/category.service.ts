import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interface/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CategoryService {
  private logger = new Logger(CategoryService.name);

  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  private toSlug(value: string) {
    return value
      .trim()
      .replace(/[^A-Z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
  }

  async create(createDto: CreateCategoryDto): Promise<ResponsePayload> {
    try {
      const slug = createDto.slug ? this.toSlug(createDto.slug) : this.toSlug(createDto.name);
      // check duplicate slug
      const exist = await this.categoryModel.findOne({ slug, isDeleted: false }).lean();
      if (exist) {
        throw new BadRequestException('Category with same slug already exists');
      }
      const created = new this.categoryModel({
        name: createDto.name,
        slug,
      });
      const saved = await created.save();
      return { success: true, data: saved, message: 'Category created successfully' } as ResponsePayload;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findAll(pagination: PaginationDto): Promise<ResponsePayload> {
    try {
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? 10;
      const skip = (page - 1) * limit;

      const [data, count] = await Promise.all([
        this.categoryModel.find({ isDeleted: false }).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
        this.categoryModel.countDocuments({ isDeleted: false }),
      ]);

      return {
        success: true,
        data,
        count,
        message: 'Successfully fetched categories',
      } as ResponsePayload;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
