import { CustomRequest } from '@import/interface'
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default (req: Request, res: Response) => {
	try {
		const user = (req as CustomRequest).user

		const { address } = req.body

		const filePath = path.join(__dirname, '..', 'data', `${user.email}.json`)

		const json = fs.readFileSync(filePath, 'utf-8')

		const data = JSON.parse(json)

		data.user.address = address

		fs.writeFileSync(filePath, JSON.stringify(data))

		return res.status(200).json({
			message: 'Address updated',
			data: data.user,
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Internal Server Error',
			data: JSON.stringify(error),
		})
	}
}
