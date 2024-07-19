import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'

const allRoutes: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
} = {
  '/health:get': (req: IncomingMessage, res: ServerResponse) => {
    res.end('Hello World \n')
  },
  default: (req: IncomingMessage, res: ServerResponse) => {
    res.end('Ouuuups not found \n')
  },
}

export function handler(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req
  const { pathname } = parse(url, true)

  const key = `${pathname}:${method.toLocaleLowerCase()}`
  const choosen = allRoutes[key] || allRoutes.default

  return choosen(req, res)
}
