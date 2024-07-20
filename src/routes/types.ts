import { IncomingMessage, ServerResponse } from 'node:http'

export type Route = {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>
}
