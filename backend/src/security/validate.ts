import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: true }); // only first error
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.details[0].message.replace(/"/g, ""), 
      });
    }
    next();
  };