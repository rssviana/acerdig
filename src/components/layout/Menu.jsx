import React from 'react'
import { Link } from 'react-router-dom'

import './Menu.css'

class Menu extends React.Component {
    render() {
        return (
            <nav className="ace-nav">
                <Link to="/dashboard/exames" >Provas</Link>
                <Link to="/dashboard/artigos" >Artigos</Link>
                <Link to="/dashboard/trabalhos" >Trabalhos</Link>
                <Link className="ace-btn-contribua" to="/upload">Contribua</Link>
            </nav>
        )
    }
}

export default Menu