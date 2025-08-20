import { Request, Response, NextFunction } from "express";
import * as transactionsService from "../services/transactions.service";

import ApiResponse from "../middleware/apiResponse";
import RESPONSE_CODES from "../constant/responseCode";
import * as GLOBAL_MESSAGE from "../constant/responseMessages";

export async function listTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id as number;
    const items = await transactionsService.list(userId);
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
      {
        items,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id as number;
    const created = await transactionsService.create(userId, req.body);
    return ApiResponse.success(
      res,
      RESPONSE_CODES.CREATED,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.TRANSACTION_CREATD,
      {
        item: created,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}
