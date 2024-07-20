import { Route } from '@/routes'
import { healthCheckStatus } from './handler'

export const healthRoutes: Route = {
  '/health:get': healthCheckStatus
}
