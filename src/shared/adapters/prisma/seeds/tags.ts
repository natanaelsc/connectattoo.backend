import { PrismaClient } from '@prisma/client';

const dataTags = [
  { name: 'Tradicional Americana (ou Old School)' },
  { name: 'Realista' },
  { name: 'Aquarela' },
  { name: 'Geométrica' },
  { name: 'Pontilhismo' },
  { name: 'Minimalista' },
  { name: 'Tatuagem Oriental (ou Irezumi)' },
  { name: 'Neotradicional' },
  { name: 'Biomecânica' },
  { name: 'New School' },
  { name: 'Caligrafia' },
  { name: 'Trash Polka' },
  { name: 'Preto e Cinza' },
  { name: 'Horror' },
  { name: 'Mandala' },
  { name: 'Vintage' },
];

export namespace Tags {
  export const data = dataTags;

  export async function populate(prisma: PrismaClient): Promise<void> {
    console.log('Seeding tags...');
    
    await prisma.tag.createMany({ data: dataTags });
  }

  export async function remove(prisma: PrismaClient): Promise<void> {
    console.log('Deleting tags...');

    const remove = dataTags.map((tag) => tag.name);

    await prisma.tag.deleteMany({ where: { name: { in: remove } } });
  }
}
