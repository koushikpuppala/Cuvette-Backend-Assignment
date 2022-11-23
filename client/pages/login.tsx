import { useState } from 'react'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSubmit = async () => {
		const body = {
			email: email,
			password: password,
		}
		try {
			const res = await fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			const data = await res.json()
			console.log(data)
			if (data) {
				localStorage.setItem('token', data.token)
				localStorage.setItem('user', JSON.stringify(data.user))
				window.location.href = '/'
			} else {
				alert(data.message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<h1>Login</h1>
			<div>
				<input
					type='text'
					name='username'
					placeholder='Username'
					defaultValue={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br /> <br />
				<input
					type='password'
					name='password'
					placeholder='Password'
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br /> <br />
				<button
					onClick={() => {
						handleSubmit()
					}}>
					Login
				</button>
			</div>
		</>
	)
}
