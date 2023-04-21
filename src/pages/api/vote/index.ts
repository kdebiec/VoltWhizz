import { prisma } from "../../../common/prisma";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { featureId } = JSON.parse(req.body);
    const token = await getToken({ req })
    const result = await prisma.userFeatureVote.create({
      data: {
        feature: { connect: { id: parseInt(featureId) } },
        user: { connect: { id: parseInt(token?.userId!) } },
      },
    });
    res.json(result);
  }
}