import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ReportService } from './report.service';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // GET /reports/summary?month=2025-10
  @Get('summary')
  async summary(@Query('month') month: string): Promise<ResponsePayload> {
    if (!month) {
      throw new BadRequestException('month query parameter is required in YYYY-MM format');
    }
    return this.reportService.summary(month);
  }
}
