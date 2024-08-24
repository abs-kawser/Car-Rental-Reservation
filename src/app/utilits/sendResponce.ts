import { Response } from "express";

type Data<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};
const sendResponce = <T>(res: Response, data: Data<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
export default sendResponce;
