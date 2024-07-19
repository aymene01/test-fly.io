import { ServerResponse } from 'node:http'
import { constant, DEFAULT_HEADER } from './constant'

type Signals = 'SIGTERM' | 'SIGINT'

export async function waitFor(signals: Signals[]): Promise<Signals> {
  return new Promise(resolve => {
    signals.forEach(signal => {
      process.on(signal, () => {
        resolve(signal)
      })
    })
  })
}

const { TEST_BASE_URL } = constant.test

export function formatUrl(ressource: string, baseUrl = TEST_BASE_URL) {
  return `${baseUrl}/${ressource}`
}

export function respondWithJson<T>(res: ServerResponse, data: T, status = 200) {
  res.writeHead(status, DEFAULT_HEADER)
  res.write(JSON.stringify(data))
  res.end()
}
