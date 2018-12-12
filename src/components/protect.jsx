import React from 'react'
import { Redirect } from 'react-router-dom'
import FirebaseContext from './FirebaseContext'
import Loading from './layout/Loading'

/**
 * HOC - High Order Component que engloba as páginas protegidas por autenticação
 * Adiciona um prop 'currentUser' para a página
 * @param {Child Component} Component
 */
const protect = Component => {
	return class Protected extends React.PureComponent {
		static contextType = FirebaseContext

		render() {
			// Se o usuário não estiver logado e já feita a verificação:
			if (!this.context.isUserSignedIn && this.context.loading)
				return <Redirect to="/sign-in" />

			// Se o usuário não estiver logado e ainda não foi feita a verificação:
			if (this.context.loading) return <Loading />

			// Se o usuáro estiver logado e feita a verificação
			return <Component currentUser={this.context.currentUser} />
		}
	}
}

export default protect
