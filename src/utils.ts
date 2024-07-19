import { constant } from "./constant"

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
