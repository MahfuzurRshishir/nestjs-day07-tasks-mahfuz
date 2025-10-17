import { Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  slug: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
