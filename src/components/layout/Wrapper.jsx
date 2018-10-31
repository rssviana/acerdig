import React from 'react'
import { oneOfType, element, arrayOf } from 'prop-types'
import firebase from '../../firebase'
import 'firebase/auth'
import Menu from './Menu'
import Sample from '../statics/images/sample.jpg'
import { withRouter } from 'react-router-dom'

window.fire = firebase

class Wrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: null
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
                    <h1 className="ace-header__heading">Acerdig</h1>
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
                <Menu />
                <div className="ace-content">
                    <div className="ace-content__shortcut">
                        <div className="ace-content__shortcut--jobs">Trabalhos</div>
                        <div className="ace-content__shortcut--exames">Provas</div>
                        <div className="ace-content__shortcut--articles">Artigos</div>
                        <div className="ace-content__shortcut--articles">Contribua</div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


Wrapper.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
}

export default withRouter(Wrapper)