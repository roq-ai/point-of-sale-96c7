import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { inventoryManagerValidationSchema } from 'validationSchema/inventory-managers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.inventory_manager
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInventoryManagerById();
    case 'PUT':
      return updateInventoryManagerById();
    case 'DELETE':
      return deleteInventoryManagerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInventoryManagerById() {
    const data = await prisma.inventory_manager.findFirst(convertQueryToPrismaUtil(req.query, 'inventory_manager'));
    return res.status(200).json(data);
  }

  async function updateInventoryManagerById() {
    await inventoryManagerValidationSchema.validate(req.body);
    const data = await prisma.inventory_manager.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInventoryManagerById() {
    const data = await prisma.inventory_manager.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
