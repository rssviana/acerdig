import React from 'react'
import { oneOfType, element, arrayOf, bool } from 'prop-types'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter, Link } from 'react-router-dom'
import Shortcut from './Shortcut'

import './Wrapper.css'

class Wrapper extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUser: null,
			hasMenu: this.props.hasMenu,
			hasShortcuts: this.props.hasShortcuts,
		}

		this.handleLogout = this.handleLogout.bind(this)

		firebase
			.auth()
			.onAuthStateChanged(currentUser => this.setState({ currentUser }))
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
		const currentUser = this.state.currentUser
		return (
			<div className="ace-wrapper">
				<header className="ace-header">
					<Link to="/dashboard">
						<h1 className="ace-header__heading">Acerdig</h1>
					</Link>
					{currentUser && (
						<div className="ace-user-credentials">
							<img
								src={currentUser.photoURL}
								className="ace-user-avatar"
								alt="My Self"
							/>
							<details>
								<summary>{currentUser.displayName}</summary>
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
		)
	}
}

Wrapper.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
	hasMenu: bool,
}

export default withRouter(Wrapper)
