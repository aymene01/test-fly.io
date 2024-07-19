import { createServer } from './createServer'
import { handler } from './handler'

const api = async () => {
  const server = createServer({
    handler,
    port: 3210,
  })

  server.start()
  await waitFor(['SIGINT', 'SIGTERM'])
  server.stop()
}

api().catch(err => console.error(err))

type Signals = 'SIGTERM' | 'SIGINT'

async function waitFor(signals: Signals[]): Promise<Signals> {
  return new Promise(resolve => {
    signals.forEach(signal => {
      process.on(signal, () => {
        resolve(signal)
      })
    })
  })
}
