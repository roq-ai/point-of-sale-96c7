import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cashierValidationSchema } from 'validationSchema/cashiers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cashier
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCashierById();
    case 'PUT':
      return updateCashierById();
    case 'DELETE':
      return deleteCashierById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCashierById() {
    const data = await prisma.cashier.findFirst(convertQueryToPrismaUtil(req.query, 'cashier'));
    return res.status(200).json(data);
  }

  async function updateCashierById() {
    await cashierValidationSchema.validate(req.body);
    const data = await prisma.cashier.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCashierById() {
    const data = await prisma.cashier.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
