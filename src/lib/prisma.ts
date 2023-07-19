import { PrismaClient } from "@prisma/client";

const prismaClientPropertyName = "__prevent-name-collision__prisma";
type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
  if (!newGlobalThis[prismaClientPropertyName]) {
    newGlobalThis[prismaClientPropertyName] = new PrismaClient({
      log:
        process.env.DEBUG && process.env.DEBUG.indexOf("prisma") >= 0
          ? ["query", "info", "warn", "error"]
          : [],
    });
  }
  return newGlobalThis[prismaClientPropertyName];
};
const prisma = getPrismaClient();

export default prisma;
