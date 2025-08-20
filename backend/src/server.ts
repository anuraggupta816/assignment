import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { sequelize } from "./setup/database";
import { runMigrationsIfDev } from "./setup/runMigrations";
import "./models"; // Ensure models and associations are initialized
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await runMigrationsIfDev();
    const server = createServer(app);

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API running on http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
