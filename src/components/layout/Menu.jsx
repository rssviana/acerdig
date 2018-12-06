import React from 'react'
import { Link } from 'react-router-dom'

import './Menu.css'

class Menu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			cursos: [
				'Administração',
				'Ciência da Computação',
				'Engenharia Civil',
				'Engenharia de Produção',
				'Engenharia Mecânica',
				'Física',
			],
		}
	}

	render() {
		return (
			<nav className="ace-nav">
				<Link className="ace-btn-contribua" to="/upload">
					Contribua
				</Link>
				<Link to="/dashboard/">Administração</Link>
				<Link to="/dashboard/">Ciência da Computação</Link>
				<Link to="/dashboard/">Engenharia Civil</Link>
				<Link to="/dashboard/">Engenharia de Produção</Link>
				<Link to="/dashboard/">Engenharia Mecânica</Link>
				<Link to="/dashboard/">Física</Link>
			</nav>
		)
	}
}

export default Menu
