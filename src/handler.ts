import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'
import { respondWithJson } from './utils'
import { DEFAULT_HEADER } from './constant'
import { prisma } from './prisma'
import { User } from '@prisma/client'

type Route = {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}

function validateCreateUserRequest(data: any) {
  if (!data['name'] || data.name.length < 2) {
    return
  }

  return
}

const userRoutes: Route = {
  '/user:get': async (req: IncomingMessage, res: ServerResponse) => {
    const users = await prisma.user.findMany()
    return respondWithJson<User[]>(res, users)
  },

  '/user:post': async (req: IncomingMessage, res: ServerResponse) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      const parsedRequest = JSON.parse(body)
      try {
        const user = await prisma.user.create({
          data: {
            name: parsedRequest.name,
          },
        })

        return respondWithJson(res, { user })
      } catch (err) {
        console.error(err)
        respondWithJson(res, { error: 'invalid request body' }, 400)
      }
    })
  },
}

const helthRoutes: Route = {
  '/health:get': (req: IncomingMessage, res: ServerResponse) => {
    res.end('Hi there \n')
  },
}

const buildRoutes = (...routes: Route[]) =>
  routes.reduce((prev, curr) => ({ ...prev, ...curr }), {
    default: (req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(404, DEFAULT_HEADER)
      res.end('Ouuuups not found \n')
    },
  })

const allRoutes = buildRoutes(helthRoutes, userRoutes)

export function handler(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req
  const { pathname } = parse(url, true)

  const key = `${pathname}:${method.toLocaleLowerCase()}`
  const choosen = allRoutes[key] || allRoutes.default

  return choosen(req, res)
}
