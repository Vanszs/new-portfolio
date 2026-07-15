import { Prisma, prisma } from './prisma';

const MAX_BACKUPS = 2;

export async function createBackup(
  tableName: string,
  recordId: string,
  data: unknown,
  action: 'UPDATE' | 'DELETE',
  tx: Prisma.TransactionClient = prisma
) {
  await tx.editBackup.create({
    data: {
      tableName,
      recordId,
      data: data as Prisma.InputJsonValue,
      action,
    },
  });

  const backups = await tx.editBackup.findMany({
    where: { tableName, recordId },
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  });

  if (backups.length > MAX_BACKUPS) {
    const toDelete = backups.slice(0, backups.length - MAX_BACKUPS);
    await tx.editBackup.deleteMany({
      where: { id: { in: toDelete.map((b) => b.id) } },
    });
  }
}
