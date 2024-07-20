import { DEFAULT_HEADER } from '@/constant'
import { IncomingMessage, ServerResponse } from 'node:http'
import { Route } from './types'

export const buildRoutes = (...routes: Route[]) =>
  routes.reduce((prev, curr) => ({ ...prev, ...curr }), {
    default: (req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(404, DEFAULT_HEADER)
      res.end('Ouuuups not found \n')
    },
  })
