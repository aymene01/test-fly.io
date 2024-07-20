import { respondWithJson } from '@/utils'
import { IncomingMessage, ServerResponse } from 'node:http'

export const healthCheckStatus = async (req: IncomingMessage, res: ServerResponse) => {
  respondWithJson(res, { hi: 'there' })
}
