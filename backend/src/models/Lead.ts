import mongoose, { Document, Schema, Types } from "mongoose";

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "lost",
  "won",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface ILead extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source?: string;
  value?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
    },
    source: { type: String, trim: true },
    value: { type: Number, min: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

leadSchema.index({ userId: 1, createdAt: -1 });
leadSchema.index({ userId: 1, status: 1 });
leadSchema.index({ userId: 1, name: "text", email: "text", company: "text", phone: "text" });

export const Lead = mongoose.model<ILead>("Lead", leadSchema);
