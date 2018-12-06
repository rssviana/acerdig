import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter } from 'react-router-dom'
import Loading from '../layout/Loading'

class PassRecovery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: false,
			login: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleLostPass = this.handleLostPass.bind(this)
		this.goHome = this.goHome.bind(this)

		firebase
			.auth()
			.onAuthStateChanged(currentUser => this.setState({ currentUser }))
	}

	goHome() {
		this.props.history.push('/sign-in')
	}

	handleChange({ target }) {
		this.setState({
			[target.name]: target.value,
		})
	}

	handleLostPass() {
		this.setState({ isLoading: true })
		const auth = firebase.auth()
		auth
			.sendPasswordResetEmail(this.state.login)
			.then(state => {
				alert(
					'Um email foi enviado para você com mais detalhes para a recuperação de senha.'
				)
				this.setState({ isLoading: false }, () => {
					this.props.history.push('/sign-in')
				})
			})
			.catch(error => {
				this.setState({ isLoading: false }, () => {
					alert(
						'Por algum motivo não conseguimos enviar o email de recuperação. Tente novamente mais tarde.'
					)
				})
			})
	}

	componentDidMount() {
		this.setState({ isLoading: false })
	}

	render() {
		const isLoading = this.state.isLoading
		return (
			<div className="ace-passrecovery">
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
							action=""
							className="ace-form"
							method=""
							onSubmit={this.handleLostPass}>
							<fieldset>
								<legend>Recupere sua senha</legend>
								<p>
									Por favor, insira seu email para que possamos enviar um email
									de recuperação de senha.
								</p>
								<p>
									<label htmlFor="login">Email</label>
									<input
										type="login"
										name="login"
										id="login"
										value={this.state.login}
										onChange={this.handleChange}
									/>
									<button type="submit">Recuperar senha</button>
								</p>
							</fieldset>
						</form>
					</div>
				)}
			</div>
		)
	}
}

export default withRouter(PassRecovery)
