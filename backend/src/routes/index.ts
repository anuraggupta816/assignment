import { Express } from "express";
import authRouter from "./auth.routes";
import portfolioRouter from "./portfolio.routes";
import investmentsRouter from "./investments.routes";
import transactionsRouter from "./transactions.routes";
import { Router } from "express";
// export function registerRoutes(app: Express) {
//   app.use("auth", authRouter);
//   app.use("portfolio", portfolioRouter);
//   app.use("investments", investmentsRouter);
//   app.use("transactions", transactionsRouter);
// }

export function registerRoutes(router: Router) {
  router.use("/auth", authRouter);
  router.use("/portfolio", portfolioRouter);
  router.use("/investments", investmentsRouter);
  router.use("/transactions", transactionsRouter);
}
