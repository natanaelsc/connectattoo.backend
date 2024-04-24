import { PrismaClient } from '@prisma/client';

const dataTags = [
  {
    "id": "b9ecb93f-611d-4aad-b997-35fd472afa39",
    "name": "Tradicional Americana"
  },
  {
    "id": "2b2158d0-0240-4f51-baf2-bfbeb6f7ee83",
    "name": "Old School"
  },
  {
    "id": "03b45798-3bfd-48e8-bf06-dcd16b6d4cfc",
    "name": "Realista"
  },
  {
    "id": "231134a0-8c34-4434-b04e-9b4dcc417396",
    "name": "Aquarela"
  },
  {
    "id": "5591ec14-d260-4211-8fed-56408fc8572b",
    "name": "Geométrica"
  },
  {
    "id": "9574d565-01e9-4ea6-a19d-41d85764d6d4",
    "name": "Pontilhismo"
  },
  {
    "id": "4dd5a4dc-cdca-4a63-b7ba-8c58e6b7ba14",
    "name": "Minimalista"
  },
  {
    "id": "6e03ec0e-e4e1-41b0-8d91-7a88d2b2d2ca",
    "name": "Tatuagem Oriental"
  },
  {
    "id": "edda5cbe-f770-40cd-a50c-f08f88c1d6a4",
    "name": "Irezumi"
  },
  {
    "id": "6242e982-062b-47a7-950a-e1b81ad5c34d",
    "name": "Neotradicional"
  },
  {
    "id": "5d721934-da63-4368-a9b6-d581af2a6125",
    "name": "Biomecânica"
  },
  {
    "id": "072d1911-3264-49b3-a11f-9feb08c147ad",
    "name": "New School"
  },
  {
    "id": "68f2962b-b662-4ea8-863a-2cbce84c6175",
    "name": "Caligrafia"
  },
  {
    "id": "8fcc59ee-0366-49b1-aaf9-854e812f063e",
    "name": "Trash Polka"
  },
  {
    "id": "6bb1be21-337a-425d-99b0-96ddf9bdcb74",
    "name": "Preto e Cinza"
  },
  {
    "id": "7dce7ee7-2ffb-419e-af7f-2cc30c682080",
    "name": "Horror"
  },
  {
    "id": "ce233e0b-07e8-4a56-b6f0-4188b2b77abb",
    "name": "Mandala"
  },
  {
    "id": "0dbd3cea-8ba0-4896-aba0-ee04563cde90",
    "name": "Vintage"
  }
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
