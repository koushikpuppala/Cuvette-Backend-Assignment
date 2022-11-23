import { useEffect, useState } from 'react'
import ProtectedRoute from '../auth/index'
import axios from 'axios'

export default function Home() {
	const [user, setUser] = useState({
		email: '',
		address: '',
	})
	const [edit, setEdit] = useState(false)
	useEffect(() => {
		axios
			.get('http://localhost:8080/user', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setUser(res.data.data)
			})
	}, [])

	const handleSave = () => {
		axios
			.post(
				'http://localhost:8080/user/address',
				{
					email: user.email,
					address: user.address,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			.then((res) => {
				setEdit(false)
			})
	}

	return (
		<ProtectedRoute>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}>
				<h3>Email: {user.email}</h3>
				<h3>
					Address:{' '}
					{edit ? (
						<input
							type='text'
							value={user.address}
							onChange={(e) => {
								setUser({ ...user, address: e.target.value })
							}}
						/>
					) : (
						user.address
					)}
				</h3>
				{edit ? (
					<button
						onClick={() => {
							handleSave()
						}}>
						Save Changes
					</button>
				) : (
					<button
						onClick={() => {
							setEdit(true)
						}}>
						Edit Address
					</button>
				)}

				<button
					style={{
						marginTop: '20px',
					}}
					onClick={() => {
						localStorage.removeItem('user')
						localStorage.removeItem('token')
						window.location.href = '/login'
					}}>
					Logout
				</button>
			</div>
		</ProtectedRoute>
	)
}
