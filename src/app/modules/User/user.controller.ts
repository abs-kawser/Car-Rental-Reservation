import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);
  sendResponce(res, {
    statusCode: 201,
    success: true,
    message: "User Create successfully",
    data: result,
  });
});
export const UserController = {
  createUser,
};
