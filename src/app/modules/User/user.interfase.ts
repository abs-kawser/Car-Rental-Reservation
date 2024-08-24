import mongoose, { Document, Model } from "mongoose";
import { user_role } from "./user.constant";

export type Tuser_role = keyof typeof user_role;

export interface TUser {
  name: string;
  email: string;
  role: Tuser_role;
  password: string;
  phone: string;
  address: string;
}

export interface TUserDocument extends TUser, Document {}

export interface UserModel extends Model<TUserDocument> {
  isUserExistsByCustomId(email: string): Promise<TUserDocument>;
  isPasswordMatched(
    plainTextPassword: string,
    hashTextPassword: string
  ): Promise<boolean>;
}
