import { Elysia, t } from "elysia";
import { registerUser } from "../services/user-service";

export const userRoutes = new Elysia({ prefix: "/api" }).post(
  "/users",
  async ({ body, set }) => {
    const result = await registerUser(body);

    if (!result.success) {
      if (result.error === "Email sudah terdaftar") {
        set.status = 400; // Bad Request atau 409 Conflict
      } else {
        set.status = 500;
      }
      return { error: result.error };
    }

    set.status = 201; // Created
    return { data: result.data };
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ minLength: 1 }),
      password: t.String({ minLength: 1 }),
    }),
  }
);
