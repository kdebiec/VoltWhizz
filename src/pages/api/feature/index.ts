import { getSession } from "next-auth/react";
import { prisma } from "../../../common/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { name } = req.body;
  const session = await getSession({ req });

  console.log("gee")
  console.log(session)

  const result = await prisma.feature.create({
    data: {
      name: name,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}