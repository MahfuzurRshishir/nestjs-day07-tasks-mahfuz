import { Document } from 'mongoose';

export interface Expense extends Document {
  title: string;
  amount: number;
  categoryId: string;
  date: Date;
  note?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
