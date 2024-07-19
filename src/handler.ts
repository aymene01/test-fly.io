import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'
import { prisma } from './prisma'
import { User } from '@prisma/client'

type Route = {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

function respondWithJson<T>(res: ServerResponse, data: T) {
    res.writeHead(200, DEFAULT_HEADER)
    res.write(JSON.stringify(data))
    res.end()
}

const userRoutes: Route = {
  '/user:get': async (req: IncomingMessage, res: ServerResponse) => {
    const users = await prisma.user.findMany()
    return respondWithJson<User[]>(res, users)
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
