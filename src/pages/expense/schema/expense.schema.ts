import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    date: { type: Date, required: true, index: true },
    note: { type: String, required: false },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Compound index to help filtering by month + category (if necessary)
ExpenseSchema.index({ categoryId: 1, date: 1 });
