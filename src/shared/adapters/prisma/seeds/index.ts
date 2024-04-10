import { PrismaClient } from '@prisma/client';
import { Tags } from './tags';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function removeAll() {
  await Tags.remove(prisma);
}

async function populateAll() {
  await Tags.populate(prisma);
}

async function initiateSeed() {
  await removeAll();
  await populateAll();
}

initiateSeed()
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
