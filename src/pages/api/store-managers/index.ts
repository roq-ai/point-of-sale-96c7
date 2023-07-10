import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { storeManagerValidationSchema } from 'validationSchema/store-managers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStoreManagers();
    case 'POST':
      return createStoreManager();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStoreManagers() {
    const data = await prisma.store_manager
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'store_manager'));
    return res.status(200).json(data);
  }

  async function createStoreManager() {
    await storeManagerValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.store_manager.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
