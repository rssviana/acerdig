import React from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter } from 'react-router-dom'
import Loading from '../layout/Loading'

class Signup extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			login: '',
			pass: '',
			repass: '',
			loading: false,
			isLoading: false,
		}

		this.handleSignup = this.handleSignup.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.goHome = this.goHome.bind(this)
	}

	goHome() {
		this.props.history.push('/sign-in')
	}
	handleChange({ target }) {
		this.setState({
			[target.name]: target.value,
		})
	}

	handleSignup(e) {
		e.preventDefault()

		let pass = this.state.pass
		let repass = this.state.repass

		if (pass === repass) {
			this.setState({ isLoading: true })
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.login, this.state.pass)
				.then(user => {
					this.props.history.push('/sign-up2')
				})
				.catch(error => {
					this.setState({ isLoading: false }, () => {
						alert(
							'Não foi possivel concretizar cadastro, tente novamente mais tarde.'
						)
					})
				})
		} else {
			alert(
				'Confirmação de senha está diferente de senha. Por favor digite a confirmação semelhante a senha.'
			)
		}
	}

	render() {
		return (
			<div>
				{this.state.isLoading ? (
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
							onSubmit={this.handleSignup}>
							<fieldset>
								<legend>Sign Up</legend>
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
									<label htmlFor="pass">Senha</label>
									<input
										type="password"
										name="pass"
										id="pass"
										value={this.state.pass}
										onChange={this.handleChange}
									/>
								</p>
								<p>
									<label htmlFor="pass"> Confirme Senha</label>
									<input
										type="password"
										name="repass"
										id="repass"
										value={this.state.repass}
										onChange={this.handleChange}
									/>
								</p>

								<button type="submit">Cadastrar</button>
							</fieldset>
						</form>
					</div>
				)}
			</div>
		)
	}
}

export default withRouter(Signup)
