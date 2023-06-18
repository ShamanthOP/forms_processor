import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const db = new PrismaClient({ log: ["query", "error", "info", "warn"] });
export default db;

export const generateId = () => {
    return nanoid(16);
};
