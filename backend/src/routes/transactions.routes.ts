import { Router } from "express";
import { requireAuth } from "../security/requireAuth";
import * as transactionsController from "../controllers/transactions.controller";
import { transactionCreateSchema } from "../validation/schemas";
import { validate } from "../security/validate";
const router = Router();

router.get("/", requireAuth, transactionsController.listTransactions);
router.post(
  "/",
  requireAuth,
  validate(transactionCreateSchema),
  transactionsController.createTransaction
);

export default router;
