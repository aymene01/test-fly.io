import test, { after, before } from 'node:test'
import { createServer } from './createServer'
import assert from 'node:assert/strict'
import { handler } from './handler'

import { formatUrl } from './utils'

const server = createServer({
  port: 3210,
  handler,
})

before(() => {
  server.start()
})

after(() => {
  server.stop()
})

test('health', async t => {
  await t.test('should return hello world', async () => {
    const response = await fetch(formatUrl('health'))
    const data = await response.text()
    assert.strictEqual(data, 'Hi there \n')
  })
})

test('defaut route', async t => {
  await t.test('should return the default route when 404', async () => {
    const data = await (await fetch(formatUrl('/jskldo'))).text()
    assert.strictEqual(data, 'Ouuuups not found \n')
  })
})
