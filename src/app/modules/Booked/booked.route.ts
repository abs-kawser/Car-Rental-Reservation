import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { bookedValidation } from "./booked.validation";
import { BookedController } from "./booked.controller";
import { user_role } from "../User/user.constant";
import auth from "../../middleware/auth";

const router = Router();
router.post(
  "/",
  auth(user_role.user),
  validationRequset(bookedValidation.newBookedValidationSchema),
  BookedController.newBooked
);

router.get("/", auth(user_role.admin), BookedController.getAllOrders);
router.get(
  "/my-bookings",
  auth(user_role.user),
  BookedController.getMyAllOrders
);
export const BookedRoute = router;
