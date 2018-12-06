import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { Link, withRouter } from 'react-router-dom'
import Loading from '../layout/Loading'
import { firebaseUser } from '../../firebase'

class SignIn extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUser: null,
			isLoading: false,
			login: '',
			pass: '',
		}

		this.goHome = this.goHome.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.isAlreadyLogged = this.isAlreadyLogged.bind(this)
		// firebase
		// 	.auth()
		// 	.onAuthStateChanged(currentUser => this.setState({ currentUser }))
	}

	isAlreadyLogged() {
		if (this.state.currentUser !== null) {
			this.props.history.push('/dashboard')
		}
	}

	goHome() {
		this.props.history.push('/sign-in')
	}

	handleChange({ target }) {
		this.setState({
			[target.name]: target.value,
		})
	}

	handleLogin(e) {
		e.preventDefault()
		this.setState({ isLoading: true })
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.login, this.state.pass)
			.then(user => {
				console.log('sign-in user', user, firebaseUser())

				this.props.history.push('/dashboard')
			})
			.catch(error => {
				this.setState({ isLoading: false })
				var errorCode = error.code
				var errorMessage = error.message
				if (errorCode === 'auth/invalid-email') {
					alert('email inválido.')
				} else if (errorCode === 'auth/user-not-found') {
					alert('Usuário não encontrado.')
				} else if (errorCode === 'auth/wrong-password') {
					alert('Senha incorreta.')
				} else {
					console.log(errorMessage)
				}
			})
	}

	render() {
		const isLoading = this.state.isLoading
		this.isAlreadyLogged()
		return (
			<div>
				{isLoading ? (
					<Loading />
				) : (
					<div className="ace-form_container">
						<div className="ace-heading">
							<h1 className="ace-heading__title" onClick={this.goHome}>
								Acerdig
							</h1>
							<p className="ace-heading__subtitle">Seu acervo digital</p>
						</div>
						<form
							className="ace-form"
							method="POST"
							action=""
							onSubmit={this.handleLogin}>
							<fieldset>
								<legend>Sign In</legend>
								<p>
									<label htmlFor="login">Email</label>
									<input
										type="login"
										name="login"
										id="login"
										value={this.state.login}
										onChange={this.handleChange}
									/>
								</p>
								<p>
									<label htmlFor="pass">Password</label>
									<input
										type="password"
										name="pass"
										id="pass"
										value={this.state.pass}
										onChange={this.handleChange}
									/>
								</p>

								<button type="submit">Entrar</button>
							</fieldset>
							<Link className="ace-form__lostpass" to="/recover-pass">
								Perdeu a senha
							</Link>
							<Link className="ace-form__link" to="/sign-up">
								Cadastre-se
							</Link>
						</form>
					</div>
				)}
			</div>
		)
	}
}

export default withRouter(SignIn)
