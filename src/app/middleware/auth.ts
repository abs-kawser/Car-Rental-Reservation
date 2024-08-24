import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilits/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Tuser_role } from "../modules/User/user.interfase";
// import { User } from "../modules/User/user.model";
// import { user_role } from "../modules/User/user.constant";

const auth = (...requiredRoles: Tuser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // const authHeader = req.headers.authorization;
    // // console.log(token);
    // const token = authHeader?.split(" ")[1];
    console.log(`it's come from auth`,token);
    
    if (!token) {
    
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const role = decoded.role;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;



// export const auth = (...requiredRoles: (keyof typeof user_role)[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.headers.authorization;

//     if (!accessToken) {
//       throw new AppError(401, "You are not authorized to access this route");
//     }
 
     

//     const verfiedToken = jwt.verify(
//       accessToken as string,
//       config.jwt_access_token as string
//     );

//     const { role, email } = verfiedToken as JwtPayload
//     const user = await User.findOne({ email });

//     if (!user) {
//       throw new AppError(401, "User not found");
//     }



//     if (!requiredRoles.includes(role)) {
//       throw new AppError(401, "You are not authorized to access this route");
//     }

//     // Attach the user object to the req object
//     req.user = user;

//     next();
//   });
// };