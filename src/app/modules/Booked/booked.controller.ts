import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { BookedService } from "./booked.service";
import { CarService } from "../Cars/car.service";

const newBooked = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookedService.newBookedIntoDB(user, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  // console.log("test", req.user);
  const result = await BookedService.getAllBookedFromDB();
  // console.log(result);
  
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car retrived are successfully",
    data: result,
  });
});



const getMyAllOrders = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookedService.getMYAllBookedFromDB(email);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

const returnBooked = catchAsync(async (req, res) => {
  const { bookingId: id } = req.body;
  const result = await BookedService.returnBookedIntoDB(id, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});

export const BookedController = {
  newBooked,
  getAllOrders,
  getMyAllOrders,
  returnBooked,
};
