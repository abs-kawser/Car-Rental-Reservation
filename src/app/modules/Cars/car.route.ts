import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { CarController } from "./car.controller";
import { CarValidation } from "./car.validation";
import { user_role } from "../User/user.constant";
import { BookedController } from "../Booked/booked.controller";
import { bookedValidation } from "../Booked/booked.validation";
import auth from "../../middleware/auth";

const router = Router();
router.post(
  "/",
  auth(user_role.admin),
  validationRequset(CarValidation.createCarValidationSchema),
  CarController.createCar
);
router.get("/:id", CarController.getSingleCar);
router.put(
  "/return",
  auth(user_role.admin),
  validationRequset(bookedValidation.updateBookedValidationSchema),
  BookedController.returnBooked
);
router.put(
  "/:id",
  auth(user_role.admin),
  validationRequset(CarValidation.updateCarValidationSchema),
  CarController.updateCar
);
router.delete("/:id", auth(user_role.admin), CarController.deleteCar);
router.get("/", CarController.getAllCar);
export const CarRoute = router;
