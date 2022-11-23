import express from 'express'
import cors, { CorsOptions } from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { config } from '@import/config'

import loginRouter from '@import/routers/login'
import userRouter from '@import/routers/user'

const app = express(),
	whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', 'localhost'],
	corsOptions: CorsOptions = {
		origin: (origin, callback) => {
			if (!origin) {
				return callback(null, true) // for mobile app and postman client
			}
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true,
	}

app.set('trust proxy', 1)

app.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cookieParser())
	.use(cors(corsOptions))
	.use('/login', loginRouter)
	.use('/user', userRouter)

app.get('/', (req, res) => {
	res.send('Running...')
})

app.listen(config.port, config.host, () => {
	console.log(`Listening on port ${config.port}`)
})
