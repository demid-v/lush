import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import type { Table } from "../../utils/types";

const tables = async (_req: NextApiRequest, res: NextApiResponse) => {
  const tables: Table[] = await prisma.$queryRaw`
    SELECT table_name as name
    FROM information_schema.tables
    WHERE table_schema = 'lush'
  `;

  res.status(200).json(tables);
};

export default tables;
