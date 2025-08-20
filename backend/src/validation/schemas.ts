import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const investmentCreateSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  asset_type: Joi.string().valid("stock", "bond", "mutual_fund").required(),
  purchase_price: Joi.number().precision(2).min(0).required(),
  current_value: Joi.number().precision(2).min(0).required(),
});

export const investmentUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(150),
  asset_type: Joi.string().valid("stock", "bond", "mutual_fund"),
  purchase_price: Joi.number().precision(2).min(0),
  current_value: Joi.number().precision(2).min(0),
}).min(1);

export const transactionCreateSchema = Joi.object({
  investment_id: Joi.number().integer().required(),
  type: Joi.string().valid("buy", "sell").required(),
  quantity: Joi.number().precision(4).positive().required(),
  price: Joi.number().precision(2).positive().required(),
});
