import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import { CarService } from "./car.service";
import sendResponce from "../../utilits/sendResponce";

const createCar = catchAsync(async (req, res) => {
  const result = await CarService.createCarIntoDB(req.body);
  sendResponce(res, {
    statusCode: 201,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});
const getAllCar = catchAsync(async (req, res) => {
  const result = await CarService.getAllCarFromDB();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.getSingleCarFromDB(id);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.updateCarIntoDB(id, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car update successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.deleteCarFromDB(id, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car delete successfully",
    data: result,
  });
});
export const CarController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
};
