import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { createOkResponse } from "./lib/http.js";
import { testMysqlConnection } from "./lib/mysql.js";
import authRoutes from "./modules/auth/auth.routes.js";
import commerceRoutes from "./modules/commerce/commerce.routes.js";
import contentRoutes from "./modules/content/content.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import leadsRoutes from "./modules/leads/leads.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((value) => value.trim()),
      credentials: true
    }),
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/uploads", express.static(env.UPLOAD_DIR));

  app.get("/api/v1/health", async (_request, response) => {
    const mysql = await testMysqlConnection().catch(() => ({
      configured: Boolean(env.MYSQL_HOST),
      connected: false
    }));

    response.json(
      createOkResponse(
        {
          service: "eagle-leap-api-node",
          environment: env.NODE_ENV,
          mysql
        },
        "API is healthy.",
      ),
    );
  });

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
  app.use("/api/v1", leadsRoutes);
  app.use("/api/v1", contentRoutes);
  app.use("/api/v1", commerceRoutes);
  app.use("/api/v1/dashboard", dashboardRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
