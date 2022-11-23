import { Request, Response } from 'express'
import { CustomRequest } from '@import/interface'
import path from 'path'
import fs from 'fs'

export default (req: Request, res: Response) => {
	try {
		const user = (req as CustomRequest).user

		const filePath = path.join(__dirname, '..', 'data', `${user.email}.json`)

		const json = fs.readFileSync(filePath, 'utf-8')

		const data = JSON.parse(json)

		return res.status(200).json({
			message: 'User data',
			data: data.user,
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Internal Server Error',
			data: JSON.stringify(error),
		})
	}
}
