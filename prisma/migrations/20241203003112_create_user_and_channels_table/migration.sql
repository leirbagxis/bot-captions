-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Channels" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "channelName" TEXT NOT NULL DEFAULT 'channel_name',
    "ownerID" BIGINT NOT NULL,
    CONSTRAINT "Channels_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Channels_id_key" ON "Channels"("id");
