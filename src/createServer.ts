import { createServer as newServer, IncomingMessage, ServerResponse } from 'node:http'
import { handler } from './handler'

type Opts = {
  port: number
  handler(req: IncomingMessage, res: ServerResponse): void | Promise<void>
}

export const createServer = (opts: Opts) => {
  const server = newServer(handler)
  return {
    server,
    start: () => server.listen(opts.port, () => console.log(`server is listening on port ${opts.port}`)),
    stop: () => server.close(),
  }
}
