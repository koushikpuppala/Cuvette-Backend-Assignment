import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { secretKey } from '../config'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const [auth, setAuth] = useState(false)
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			window.location.href = '/login'
		} else {
			jwt.verify(token, secretKey, (err, decoded) => {
				if (err) {
					window.location.href = '/login'
				} else {
					setAuth(true)
				}
			})
		}
	}, [])

	return <>{auth && children}</>
}
export default ProtectedRoute
