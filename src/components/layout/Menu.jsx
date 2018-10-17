import React from 'react'
import { Link } from 'react-router-dom'

class Menu extends React.Component {
    render() {
        return (
            <nav className="ace-nav">
                <Link to="/dashboard/exames" >Provas</Link>
                <Link to="/dashboard/artigos" >Trabalho de conclusão de módulos</Link>
                <Link to="/dashboard/trabalhos" >Trabalhos</Link>
            </nav>
        )
    }
}

export default Menu