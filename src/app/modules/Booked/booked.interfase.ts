import mongoose, { Types } from "mongoose";

export type TBooked = {
  date: string;
  user?: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
  isBooked?: "unconfirmed" | "confirmed";
};
