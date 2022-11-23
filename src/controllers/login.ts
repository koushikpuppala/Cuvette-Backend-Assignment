import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@import/config'
import fs from 'fs'
import path from 'path'

export default (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const token = jwt.sign(
			{
				email,
				password,
			},
			config.secretKey,
			{
				expiresIn: 60 * 60 * 1000,
			}
		)

		const filePath = path.join(__dirname, '..', 'data', `${email}.json`)

		const data = {
			token,
			user: {
				email,
				password,
			},
		}

		fs.writeFileSync(filePath, JSON.stringify(data))

		return res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				email,
			},
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Internal Server Error',
			data: JSON.stringify(error),
		})
	}
}
