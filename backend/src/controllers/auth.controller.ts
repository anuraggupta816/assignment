import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

import ApiResponse from "../middleware/apiResponse";
import RESPONSE_CODES from "../constant/responseCode";
import * as GLOBAL_MESSAGE from "../constant/responseMessages";
export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await authService.register(
      req.body.name,
      req.body.email,
      req.body.password
    );
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
      {
        user,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, user } = await authService.login(
      req.body.email,
      req.body.password
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      //sameSite: "lax" ,
      sameSite: "none",
    });
    return ApiResponse.success(
      res,
      RESPONSE_CODES.SUCCESS,
      GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
      {
        token,
        user,
      }
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

export async function logoutUser(_req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

export async function getCurrentUser(req: Request, res: Response) {
  const auth = (req as any).user;
  if (!auth)
    return ApiResponse.ErrorResponse(
      res,
      401,
      GLOBAL_MESSAGE.ERROR_MESSAGES.UNAUTHOIZED
    ); //return res.status(401).json({ message: "Unauthorized" });
  //res.json({ user: auth });
  return ApiResponse.success(
    res,
    RESPONSE_CODES.SUCCESS,
    GLOBAL_MESSAGE.SUCCESS_MESSAGES.SUCCESS,
    {
      user: auth,
    }
  );
}
