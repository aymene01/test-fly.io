import { Route } from '../types'
import { createUser, getAllUsers } from './handlers'

export const userRoutes: Route = {
  '/user:get': getAllUsers,
  '/user:post': createUser,
}
