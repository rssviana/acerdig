import React from 'react'
import { Link } from 'react-router-dom'
import './Shortcut.css'

const Shortcut = () => {
    return (
        <div className="ace-shortcut">
            <div className="ace-shortcut__item">Trabalhos</div>
            <div className="ace-shortcut__item">Provas</div>
            <div className="ace-shortcut__item">Artigos</div>
            <div className="ace-shortcut__item"><Link to="/upload">Contribua</Link></div>
        </div>
    )
}

export default Shortcut