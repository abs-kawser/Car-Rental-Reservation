import { TUser } from "./user.interfase";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
