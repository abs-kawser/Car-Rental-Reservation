import { Router } from "express";
import { UserController } from "./user.controller";
import validationRequset from "../../middleware/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router();
router.post(
  "/signup",
  validationRequset(UserValidation.createUserValidationSchema),
  UserController.createUser
);
export const userRoute = router;
