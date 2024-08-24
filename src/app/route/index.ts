import { Router } from "express";
import { userRoute } from "../modules/User/user.route";
import { CarRoute } from "../modules/Cars/car.route";
import { BookedRoute } from "../modules/Booked/booked.route";
import { AuthRoute } from "../modules/Auth/auth.route";

const router = Router();
const modulesRoute = [
  {
    path: "/create-user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/cars",
    route: CarRoute,
  },
  {
    path: "/bookings",
    route: BookedRoute,
  },
];
modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
