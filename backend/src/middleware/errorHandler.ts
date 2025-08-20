import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import RESPONSE_CODES from "../constant/responseCode";
import { ERROR_MESSAGES } from "../constant/responseMessages";
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || undefined;
  res.status(status).json({ message, details });
}
