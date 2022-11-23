import { address, user } from '@import/controllers'
import { checkAuth } from '@import/middleware'
import { Router } from 'express'

const router = Router()

router.get('/', checkAuth, user)
router.post('/address', checkAuth, address)

export default router
