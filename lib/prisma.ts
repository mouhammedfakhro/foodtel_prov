import { PrismaClient } from "@prisma/client";

const createAcceleratedPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? 
          ["error", "warn"]
        : ["error"],
  });
};

type PrismaClientAccelerated = ReturnType<typeof createAcceleratedPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientAccelerated | undefined;
};

let prisma = globalForPrisma.prisma ?? createAcceleratedPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;