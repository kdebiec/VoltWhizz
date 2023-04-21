import { prisma } from "../../../common/prisma";
import { getToken } from "next-auth/jwt";

// POST /api/feature
// Required fields in body: name
export default async function handle(req, res) {
  const { name } = JSON.parse(req.body);
  const token = await getToken({req})
  const result = await prisma.feature.create({
    data: {
      name: name,
      user: { connect: { id: parseInt(token?.userId! ) } },
    },
  });
  res.json(result);
}