import { prisma } from "../../../common/prisma";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query
    const token = await getToken({ req })
    const result = await prisma.userFeatureVote.delete({
      where: {
        userId_featureId: {
          userId: parseInt(token?.userId!),
          featureId: parseInt(id?.toString()!),
        },
      },
    });
    res.json(result);
  }
}