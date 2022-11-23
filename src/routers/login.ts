import { login } from '@import/controllers'
import { checkAuth } from '@import/middleware'
import { Router } from 'express'

const router = Router()

router.post('/', login)

export default router
