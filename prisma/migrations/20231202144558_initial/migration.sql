-- CreateTable
CREATE TABLE "TattooClient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TattooClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TattooArtist" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TattooArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TattooArtistAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Brazil',
    "zipCode" TEXT NOT NULL,
    "tattooArtistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TattooArtistAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TattooClient_email_key" ON "TattooClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TattooArtist_email_key" ON "TattooArtist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TattooArtistAddress_tattooArtistId_key" ON "TattooArtistAddress"("tattooArtistId");

-- AddForeignKey
ALTER TABLE "TattooArtistAddress" ADD CONSTRAINT "TattooArtistAddress_tattooArtistId_fkey" FOREIGN KEY ("tattooArtistId") REFERENCES "TattooArtist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
