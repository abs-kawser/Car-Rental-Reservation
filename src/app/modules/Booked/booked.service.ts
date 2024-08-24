import { User } from "../User/user.model";
import { TBooked } from "./booked.interfase";
import { Booked } from "./booked.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { Car } from "../Cars/car.model";
import { calculationTotalDurationTime } from "./booked.utils";
import mongoose from "mongoose";
import { TUser } from "../User/user.interfase";
interface TBookeded extends Document {
  carId: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  [key: string]: any;
}
const newBookedIntoDB = async (
  user: Record<string, unknown>,
  payload: TBooked
) => {
  const filterLoginUser = await User.findOne({ email: user.email });
  // console.log(filterLoginUser);
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  const newUser = filterLoginUser._id;
  payload.user = newUser as mongoose.Types.ObjectId;
  // console.log(payload);

  const filterCar = await Car.findOne({ _id: payload.carId });
  if (!filterCar) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not Found");
  }
  const { _id } = filterCar;
  const statusUpdateCar = await Car.findByIdAndUpdate(
    _id,
    {
      status: "unavailable",
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const result = (
    await (await Booked.create(payload)).populate("user")
  ).populate("carId");
  return result;
};

const getAllBookedFromDB = async () => {

  const result = await Booked.find().populate("carId").populate("user");
  console.log(result);
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};



const getMYAllBookedFromDB = async (email: string) => {
  // console.log(email);
  const filterLoginUser = await User.findOne({ email });
  // console.log(filterLoginUser);
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const userId = filterLoginUser._id;
  const result = await Booked.find({ user: userId })
    .populate("carId")
    .populate("user");
  // console.log(result);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};

const getSingleBookedFromDB = async (id: string) => {
  const result = await Booked.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const returnBookedIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {
  // console.log("get id", id);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { bookingId } = payload;
    const findBook = await Booked.findById({ _id: bookingId });
    if (!findBook) {
      throw new AppError(httpStatus.NOT_FOUND, "Bookigs is not Found");
    }
    const { carId } = findBook;

    const findCar = await Car.findOneAndUpdate(
      { _id: carId },
      { status: "available" },
      { new: true, runValidators: true }
    );
    if (!findCar) {
      throw new AppError(httpStatus.NOT_FOUND, "booked not foundd");
    }
    // console.log(findCar.pricePerHour);
    const { pricePerHour } = findCar;

    const FilterBooked = await Booked.findByIdAndUpdate(id, payload, session);
    // console.log("find the", result);
    if (!FilterBooked) {
      throw new AppError(httpStatus.NOT_FOUND, "booked not foundd");
    }
    const { startTime, endTime } = FilterBooked;

    const filterTotalCost = calculationTotalDurationTime(
      startTime,
      endTime as string,
      pricePerHour
    );
    payload.totalCost = filterTotalCost;
    const result = await Booked.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
      .populate("user")
      .populate("carId");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const BookedService = {
  getAllBookedFromDB,
  newBookedIntoDB,
  getSingleBookedFromDB,
  getMYAllBookedFromDB,
  returnBookedIntoDB,
};
