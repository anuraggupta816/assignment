import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import ApiResponse from "../middleware/apiResponse";
import * as GLOBAL_MESSAGE from "../constant/responseMessages";
export async function register(name: string, email: string, password: string) {
  console.log("assadas11:::name", name);
  const exists = await User.findOne({ where: { email } });
  console.log("assadas11:::name1", name);
  if (exists)
    throw {
      status: 409,
      message: GLOBAL_MESSAGE.ERROR_MESSAGES.EMAIL_ALREDAY_EXIST,
    };
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash });
  return sanitizeUser(user);
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw {
      status: 401,
      message: GLOBAL_MESSAGE.ERROR_MESSAGES.INVALID_CREDENTIAL,
    };
  const ok = await user.checkPassword(password);
  if (!ok)
    throw {
      status: 401,
      message: GLOBAL_MESSAGE.ERROR_MESSAGES.INVALID_CREDENTIAL,
    };
  const token = signToken({ id: user.id, email: user.email });
  return { token, user: sanitizeUser(user) };
}

export function signToken(payload: { id: number; email: string }) {
  const secret: Secret = (process.env.JWT_SECRET as Secret) || "dev_secret";
  const expiresIn: SignOptions["expiresIn"] =
    (process.env.JWT_EXPIRES_IN as any) || "1d";
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
}

export function sanitizeUser(user: User) {
  return { id: user.id, name: user.name, email: user.email };
}
