import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";

export const registerUser = async (payload: any) => {
  try {
    // 1. Cari user di database berdasarkan email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email))
      .limit(1);

    // 2. Jika sudah ada, kembalikan error
    if (existingUser.length > 0) {
      return {
        success: false,
        error: "Email sudah terdaftar",
      };
    }

    // 3. Lakukan hashing pada string password menggunakan bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    // 4. Lakukan proses INSERT ke tabel users menggunakan Drizzle ORM
    await db.insert(users).values({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    // 5. Kembalikan balikan OK jika sukses
    return {
      success: true,
      data: "OK",
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};
