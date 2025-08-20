import { Request, Response, NextFunction } from "express";
import * as investmentsService from "../services/investments.service";
import ApiResponse from "../middleware/apiResponse";
import RESPONSE_CODES from "../constant/responseCode";
import * as GLOBAL_MESSAGE from "../constant/responseMessages";

export async function listInvestments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id as number;
    const items = await investmentsService.list(userId);
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
      {
        //userId,
        ...items,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function createInvestment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id as number;
    const created = await investmentsService.create(userId, req.body);
    //res.status(201).json({ item: created });
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.INVESTMENT_CREATD,
      {
        userId,
        item: created,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function getInvestmentById(req: Request, res: Response) {
  const userId = (req as any).user.id as number;
  const id = Number(req.params.id);
  const item = await investmentsService.getById(userId, id);
  if (!item)
    return ApiResponse.ErrorResponse(
      res,
      400,
      GLOBAL_MESSAGE.ERROR_MESSAGES.VALIDATION_FAILED
    );
  return ApiResponse.success(
    res,
    RESPONSE_CODES.SUCCESS,
    GLOBAL_MESSAGE.SUCCESS_MESSAGES.PORTFOLIO_CREATD,
    {
      //userId,
      item,
    }
  );
}

export async function updateInvestment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user.id as number;
    const id = Number(req.params.id);
    const updated = await investmentsService.update(userId, id, req.body);
    if (!updated)
      return ApiResponse.ErrorResponse(
        res,
        400,
        GLOBAL_MESSAGE.ERROR_MESSAGES.INVESTMENT_NOT_FOUND
      );
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.PORTFOLIO_UPDATED,
      {
        //userId,
        item: updated,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function deleteInvestment(req: Request, res: Response) {
  const userId = (req as any).user.id as number;
  const id = Number(req.params.id);
  const removed = await investmentsService.remove(userId, id);
  if (!removed)
    return ApiResponse.ErrorResponse(
      res,
      400,
      GLOBAL_MESSAGE.ERROR_MESSAGES.INVESTMENT_NOT_FOUND
    );

  return ApiResponse.success(
    res,
    RESPONSE_CODES.NOCONTENT,
    GLOBAL_MESSAGE.SUCCESS_MESSAGES.PORTFOLIO_CREATD,
    {}
  );
}
