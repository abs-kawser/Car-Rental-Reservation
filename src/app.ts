import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/route";
import gobalErrorHandler from "./app/middleware/gobalErrorHandler";
import NotFound from "./app/middleware/notFound";

const app: Application = express();
// app.use(cors());
app.use(cors({
  origin: 'car-rental-reservation-tau.vercel.app', // Replace with your frontend domain
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.use();
app.use(gobalErrorHandler);
app.use(NotFound);
export default app;
