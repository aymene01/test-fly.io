import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'

type Route = {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}

const userRoutes: Route = {
  '/user:get': (req: IncomingMessage, res: ServerResponse) => {
    res.end('Hello from user routes \n')
  },
}

const helthRoutes: Route = {
  '/health:get': (req: IncomingMessage, res: ServerResponse) => {
    res.end('Hello World \n')
  },
}

const buildRoutes = (...routes: Route[]) =>
  routes.reduce((prev, curr) => ({ ...prev, ...curr }), {
    default: (req: IncomingMessage, res: ServerResponse) => {
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
