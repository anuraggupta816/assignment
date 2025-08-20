import { Request, Response } from "express";
import * as transactionsService from "../services/transactions.service";

import ApiResponse from "../middleware/apiResponse";
import RESPONSE_CODES from "../constant/responseCode";
import * as GLOBAL_MESSAGE from "../constant/responseMessages";

export async function getOverview(req: Request, res: Response) {
  const userId = (req as any).user.id as number;
  const overview = await transactionsService.overview(userId);
  //res.json(overview);
  return ApiResponse.success(
    res,
    RESPONSE_CODES.SUCCESS,
    GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
    {
      ...overview,
    }
  );
}
