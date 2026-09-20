import { Elysia } from "elysia";
import { db } from "./db";

const app = new Elysia()
  .get("/", () => "Hello from Elysia + Bun + Drizzle + MySQL!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
