import { PrismaClient } from "@prisma/client";

//conexão prisma
export const prisma = new PrismaClient({
  //mostra os logs e no final mostra o commit
  log: ['query']
})