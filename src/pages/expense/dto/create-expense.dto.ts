import { IsNotEmpty, IsNumber, IsOptional, IsString, IsMongoId, IsISO8601 } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsISO8601()
  date?: string; // accept ISO date string; service will coerce

  @IsOptional()
  @IsString()
  note?: string;
}
