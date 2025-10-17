import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from '../expense/interface/expense.interface';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';

@Injectable()
export class ReportService {
  private logger = new Logger(ReportService.name);

  constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) {}

  /**
   * summary for a month:
   * - total: sum of amounts
   * - categoryWise: [{ categoryId, categoryName, total }]
   *
   * month: 'YYYY-MM' (required)
   */
  async summary(month: string): Promise<ResponsePayload> {
    try {
      const parts = month.split('-');
      const year = Number(parts[0]);
      const mon = Number(parts[1]) - 1;
      const start = new Date(year, mon, 1);
      const end = new Date(year, mon + 1, 1);

      // pipeline:
      const pipeline = [
        { $match: { date: { $gte: start, $lt: end }, isDeleted: false } },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$category._id',
            categoryName: { $first: '$category.name' },
            total: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            categoryId: '$_id',
            categoryName: 1,
            total: 1,
            count: 1,
          },
        },
      ];

      const categoryWise = await this.expenseModel.aggregate(pipeline);

      // compute overall total
      const overall = categoryWise.reduce((s, item) => s + (item.total || 0), 0);

      return {
        success: true,
        reports: {
          month,
          total: overall,
          categoryWise,
        },
        message: 'Summary fetched',
      } as ResponsePayload;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
