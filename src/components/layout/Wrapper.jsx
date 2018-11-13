import React from 'react'
import { oneOfType, element, arrayOf, bool } from 'prop-types'
import firebase from '../../firebase'
import 'firebase/auth'
import Menu from './Menu'
import { withRouter, Link } from 'react-router-dom'
import Shortcut from './Shortcut'

import './Wrapper.css'

window.fire = firebase

class Wrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: null,
            hasMenu: this.props.hasMenu,
            hasShortcuts: this.props.hasShortcuts,
        }

        this.handleLogout = this.handleLogout.bind(this)

        firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }))
    }

    handleLogout() {
        firebase.auth().signOut().then(() => {
            this.props.history.push('/sign-in')
        },
            function (error) { alert('Algo de errado não esta certo, tente novamente!') })
    }

    render() {
        const currentUser = this.state.currentUser
        return (
            <div className="ace-wrapper">
                <header className="ace-header">
                    <Link to="/dashboard">
                        <h1 className="ace-header__heading">Acerdig</h1>
                    </Link>
                    {
                        currentUser && (
                            <div currentUser={currentUser} className="ace-user-credentials">
                                <img src={currentUser.photoURL} className="ace-user-avatar" alt="My Self" />
                                <details>
                                    <summary>{currentUser.displayName}</summary>
                                    <p className="ace-user-logout" onClick={this.handleLogout}>Logout</p>
                                </details>
                            </div>
                        )
                    }
                </header>
                {this.state.hasMenu && (
                    <Menu />
                )}
                {this.state.hasShortcuts && (
                    <div className="ace-content">
                        <Shortcut />
                        {this.props.children}
                    </div>
                )}
            </div>
        )
    }
}


Wrapper.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
    hasMenu: bool
}

export default withRouter(Wrapper)