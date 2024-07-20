import { prisma } from '@/prisma'
import { respondWithJson } from '@/utils'
import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(2),
})

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', async () => {
    const parsedRequest = JSON.parse(body)
    const { success, data } = createUserSchema.safeParse(parsedRequest)

    if (!success) {
      return respondWithJson(res, { error: 'invalid request body' }, 400)
    }

    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
        },
      })

      return respondWithJson(res, { user })
    } catch (err) {
      console.error(err)
      return respondWithJson(res, { error: 'internal server error' }, 500)
    }
  })
}
