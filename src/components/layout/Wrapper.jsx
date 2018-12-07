import React from 'react'
import { oneOfType, element, arrayOf, bool } from 'prop-types'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter, Link } from 'react-router-dom'
import Shortcut from './Shortcut'
import FirebaseContext from '../FirebaseContext'

import './Wrapper.css'

class Wrapper extends React.Component {
	static contextType = FirebaseContext

	constructor(props) {
		super(props)

		this.state = {
			currentUser: null,
			hasMenu: this.props.hasMenu,
			hasShortcuts: this.props.hasShortcuts,
		}

		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.props.history.push('/sign-in')
			})
			.catch(error => {
				alert('Algo de errado não esta certo, tente novamente!')
			})
	}

	render() {
		const currentUser = this.context.auth.currentUser // Pega o usuário logado pelo contexto

		return (
			<div>
				<div className="ace-wrapper">
					<header className="ace-header">
						<Link to="/dashboard">
							<h1 className="ace-header__heading">Acerdig</h1>
						</Link>
						{currentUser && (
							<div className="ace-user-credentials">
								<img
									src={
										currentUser.photoURL ||
										'http://chittagongit.com//images/icon-for-profile/icon-for-profile-12.jpg'
									}
									className="ace-user-avatar"
									alt="My Self"
								/>
								<details>
									<summary>{currentUser.displayName || 'No one'}</summary>
									<div className="ace-user-actions">
										<p className="ace-user-logout">
											<Link to="/things" className="ace-user-logout">
												My things
											</Link>
										</p>
										<p className="ace-user-logout">
											<Link to="/profile" className="ace-user-logout">
												Profile
											</Link>
										</p>
										<p onClick={this.handleLogout} className="ace-user-logout">
											Logout
										</p>
									</div>
								</details>
							</div>
						)}
					</header>
					{this.state.hasShortcuts ? (
						<div className="ace-content">
							<Shortcut />
							{this.props.children}
						</div>
					) : (
						<div className="ace-content">{this.props.children}</div>
					)}
				</div>
				<footer className="ace-footer">
					<h1 className="ace-footer__heading">Acerdig</h1>
					<p>Criadores:</p>
					<ul className="ace-footer__creators">
						<li className="ace-footer__creator">
							<img
								src="https://media.licdn.com/dms/image/C4D03AQHlZahOss3Q0A/profile-displayphoto-shrink_800_800/0?e=1549497600&v=beta&t=Cbj3wipaZM3bzcCN48IS9TvjitYGrj_mRbt7ieSZFAo"
								alt=""
							/>
							<p>Heberth</p>
						</li>
						<li className="ace-footer__creator">
							<img
								src="https://media.licdn.com/dms/image/C5103AQFAWWRtY3Yeog/profile-displayphoto-shrink_200_200/0?e=1549497600&v=beta&t=k8jEJgH1LRBN7XnexXn1dPzR9ozoGjTrDPKrHMqPELs"
								alt=""
							/>
							<p>Ronan</p>
						</li>
					</ul>
					<span>Esta aplicação não tem fins lucrativos.</span>
					<span>
						Esta aplicação Foi realizada para ser avaliada como Trabalho de
						conclusão de Curso.
					</span>
				</footer>
			</div>
		)
	}
}

Wrapper.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
	hasMenu: bool,
}

export default withRouter(Wrapper)
