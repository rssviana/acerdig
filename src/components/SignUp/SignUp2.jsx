import React from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter } from 'react-router-dom'

class Signup2 extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			avatar: '',
			avatarURL: [
				'boy-1.png',
				'boy.png',
				'girl.png',
				'girl-1.png',
				'man-1.png',
				'man-2.png',
				'man-3.png',
				'man-4.png',
				'man.png',
			],
			baseUrl:
				'https://firebasestorage.googleapis.com/v0/b/acerdig-4edc5.appspot.com/o/avatars%2F',
			currentAvtr: '',
			currentUser: null,
			displayName: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleUpdateProfile = this.handleUpdateProfile.bind(this)
		this.renderAvatars = this.renderAvatars.bind(this)

		firebase
			.auth()
			.onAuthStateChanged(currentUser => this.setState({ currentUser }))
	}

	handleChange({ target }) {
		this.setState({
			[target.name]: target.value,
		})
	}

	renderAvatars() {
		return this.state.avatarURL.map(filename => {
			return (
				<li
					key={filename}
					onClick={e => {
						this.setState({ currentAvtr: filename })
					}}
					className="ace-form__avatar">
					<img
						src={`${this.state.baseUrl}${filename}?alt=media`}
						alt="avatar"
					/>
				</li>
			)
		})
	}

	handleUpdateProfile(e) {
		e.preventDefault()
		const user = this.state.currentUser
		const photoURL = `${this.state.baseUrl}${this.state.currentAvtr}?alt=media`

		let theUser = this.state.displayName
		let avatar = this.state.currentAvtr

		if (theUser !== '' && avatar !== '') {
			user
				.updateProfile({
					displayName: this.state.displayName,
					photoURL,
				})
				.then(() => {
					this.props.history.push('/dashboard')
				})
				.catch(error => {
					alert(
						'Não foi possivel alterar seus dados no momento, tente novamente mais tarde !'
					)
				})
		} else {
			alert('Por favo escolha um avatar e um apelido.')
		}
	}

	render() {
		return (
			<div className="ace-form_container">
				<div className="ace-heading">
					<h1 className="ace-heading__title">Acerdig</h1>
					<p className="ace-heading__subtitle">Seu acervo digital</p>
				</div>
				<form
					className="ace-form"
					method="POST"
					action=""
					onSubmit={this.handleUpdateProfile}>
					<fieldset>
						<legend>Mais Informações</legend>
						<ul className="ace-form__listofavatars">
							<label>Escolha seu avatar</label>
							{this.renderAvatars()}
							{this.state.currentAvtr !== '' && (
								<div>
									<p>Você escolheu o seguinte avatar:</p>
									<img
										className="avatar-choosen"
										src={`${this.state.baseUrl}${
											this.state.currentAvtr
										}?alt=media`}
										alt="avatar"
									/>
								</div>
							)}
						</ul>
						<p>
							<label htmlFor="displayName">Apelido</label>
							<input
								type="displayName"
								name="displayName"
								id="displayName"
								value={this.state.displayName}
								onChange={this.handleChange}
							/>
						</p>
						<button type="submit">Cadastrar</button>
					</fieldset>
				</form>
			</div>
		)
	}
}

export default withRouter(Signup2)
