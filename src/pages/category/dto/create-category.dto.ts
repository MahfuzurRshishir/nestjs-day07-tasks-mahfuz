import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // allow overriding slug if needed (optional)
  @IsOptional()
  @IsString()
  slug?: string;
}
