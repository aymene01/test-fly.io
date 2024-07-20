import { prisma } from '@/prisma'
import { respondWithJson } from '@/utils'
import { IncomingMessage, ServerResponse } from 'node:http'

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = await prisma.user.findMany()
  return respondWithJson(res, users)
}
