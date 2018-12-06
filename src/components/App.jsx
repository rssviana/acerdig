import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Artigos from './Artigos/Artigos.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Exames from './Exames/Exames.jsx'
import PassRecovery from './PassRecovery/PassRecovery'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import SignUp2 from './SignUp/SignUp2.jsx'
import Trabalhos from './Trabalhos/Trabalhos.jsx'
import Upload from './Upload/Upload.jsx'
import Profile from './Profile/Profile'
import Things from './Things/Things'
import firebase from '../firebase'
import 'firebase/auth'
import FirebaseContext from './FirebaseContext'
import { PrivateRoute, PublicRoute } from './routes'
import Loading from './layout/Loading'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			auth: {
				currentUser: null,
				isUserSignedIn: false,
				loading: true,
			},
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			console.log('auth changed user, demora essa porra a atualizar pqp', user)
			this.setState({
				auth: {
					currentUser: user,
					isUserSignedIn: !!user,
					loading: false,
				},
			})
		})
	}

	render() {
		if (this.state.auth.loading) return <Loading />
		return (
			<FirebaseContext.Provider value={this.state}>
				<Router>
					<Switch>
						<Route path="/" exact component={SignIn} />
						<PublicRoute
							auth={this.state.auth}
							path="/sign-in"
							component={SignIn}
						/>
						<PublicRoute
							auth={this.state.auth}
							path="/sign-up"
							component={SignUp}
						/>
						<PublicRoute
							auth={this.state.auth}
							path="/recover-pass"
							component={PassRecovery}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/sign-up2"
							component={SignUp2}
							redirect={false}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/dashboard"
							component={Dashboard}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/upload"
							component={Upload}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/profile"
							component={Profile}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/artigos"
							component={Artigos}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/exames"
							component={Exames}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/trabalhos"
							component={Trabalhos}
						/>
						<PrivateRoute
							auth={this.state.auth}
							path="/things"
							component={Things}
						/>
						<Route render={() => <h3>404 - Rota não encontrada</h3>} />
					</Switch>
				</Router>
			</FirebaseContext.Provider>
		)
	}
}

export default App
