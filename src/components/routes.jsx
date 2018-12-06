import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { firebaseUser } from '../firebase'
import 'firebase/auth'

/**
 * Se estamos autenticado, completa a rota, se não, redireciona para o /sign-in
 */
export const PrivateRoute = ({
	component: Component,
	auth,
	redirect,
	path,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				/**
				 * Força o usuário a escolher o avatar e o nickname caso esteja logado
				 */
				if (
					firebaseUser() &&
					!firebaseUser().displayName &&
					path != '/sign-up2'
				)
					return (
						<Redirect
							to={{ pathname: '/sign-up2', state: { from: props.location } }}
						/>
					)
				return firebaseUser() ? (
					<Component {...props} currentUser={firebaseUser()} />
				) : (
					<Redirect
						to={{ pathname: '/sign-in', state: { from: props.location } }}
					/>
				)
			}}
		/>
	)
}

/**
 * Se estamos autenticado, redireciona para o /dashboard, se não, completa a rota
 */
export const PublicRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				return !firebaseUser() ? (
					<Component {...props} />
				) : (
					<Redirect to="/dashboard" />
				)
			}}
		/>
	)
}
