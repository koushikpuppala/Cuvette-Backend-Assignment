import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@import/config'
import type { CustomRequest } from '@import/interface'
export default async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		return res.status(401).json({
			message: 'Cannot find token',
		})
	}
	try {
		jwt.verify(token, config.secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message: 'Auth failed',
					data: err.message,
				})
			}
			;(req as CustomRequest).user = decoded
			console.log(decoded)
			next()
		})
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed',
		})
	}
}
