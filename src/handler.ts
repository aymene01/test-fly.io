import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:url'
import * as routes from './routes'


const allRoutes = routes.buildRoutes(routes.healthRoutes, routes.userRoutes)

export function handler(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req
  const { pathname } = parse(url, true)

  const key = `${pathname}:${method.toLocaleLowerCase()}`
  const choosen = allRoutes[key] || allRoutes.default

  return choosen(req, res)
}
