import { Router } from "express";
import { requireAuth } from "../security/requireAuth";
import * as investmentsController from "../controllers/investments.controller";
import {
  investmentCreateSchema,
  investmentUpdateSchema,
} from "../validation/schemas";
import { validate } from "../security/validate";

const router = Router();

router.get("/", requireAuth, investmentsController.listInvestments);
router.get("/:id", requireAuth, investmentsController.getInvestmentById);
router.post(
  "/",
  requireAuth,
  validate(investmentCreateSchema),
  investmentsController.createInvestment
);

router.put(
  "/:id",
  requireAuth,
  validate(investmentUpdateSchema),
  investmentsController.updateInvestment
);
router.delete("/:id", requireAuth, investmentsController.deleteInvestment);

export default router;
