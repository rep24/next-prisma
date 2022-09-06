/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { Products } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse<Products[]>) => {
  //get以外のリクエストを許可しない
  if (req.method?.toLocaleLowerCase() !== 'get') {
    return res.status(405).end()
  }

  const index = await prisma.products.findMany()
  res.status(200).json(index)
}
