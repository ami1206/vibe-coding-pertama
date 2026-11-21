import { Elysia } from "elysia";
import { db } from "./db";

import { userRoutes } from "./routes/user-route";

const app = new Elysia()
  .use(userRoutes)
  .get("/", () => "Hello from Elysia + Bun + Drizzle + MySQL!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
