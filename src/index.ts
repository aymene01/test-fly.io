import { createServer } from './createServer'
import { waitFor } from './utils'
import { handler } from './handler'

const api = async () => {
  const server = createServer({
    handler,
    port: 3000,
  })

  server.start()
  await waitFor(['SIGINT', 'SIGTERM'])
  server.stop()
}

api().catch(err => console.error(err))
