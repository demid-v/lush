import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const tables = async (req: NextApiRequest, res: NextApiResponse) => {
  const tables = await prisma.$queryRaw`
    SELECT table_name as name
    FROM information_schema.tables 
    WHERE table_schema = 'lush'
  `;

  res.status(200).json(tables);
};

export default tables;
