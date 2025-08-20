import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { sequelize } from "./models";
const BASE_PATH = process.env.BASE_PATH || "";
const app = express();

// app.use(cors({
// 	origin: process.env.CORS_ORIGIN?.split(',') || '*',
// 	credentials: true
// }));
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev server
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "*",
//     credentials: false,
//   })
// );
app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get(`${BASE_PATH}/health`, (_req, res) => {
  res.json({ status: "ok" });
});

//registerRoutes(app);
// ✅ Register all routes under /api
const router = express.Router();
registerRoutes(router);

app.use(BASE_PATH, router);
//app.use(router);
// ✅ 404 handler (must be after routes, before errorHandler)
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "API route not found",
  });
});

app.use(errorHandler);

export default app;
