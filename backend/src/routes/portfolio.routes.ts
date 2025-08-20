import { Router } from "express";
import { requireAuth } from "../security/requireAuth";
import * as portfolioController from "../controllers/portfolio.controller";

const router = Router();

router.get("/", requireAuth, portfolioController.getOverview);

export default router;
