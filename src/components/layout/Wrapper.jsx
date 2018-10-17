import React from 'react'
import { oneOfType, element, arrayOf } from 'prop-types'
import firebase from '../../firebase'
import 'firebase/auth'
import Menu from './Menu'

window.fire = firebase

class Wrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: null
        }

        firebase.auth().onAuthStateChanged(currentUser => this.setState({currentUser}))
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
                                    <img src={currentUser.photoURL} className="" alt=""/>
                                    <p className="">{currentUser.displayName}</p>
                                    <p className="">{currentUser.email}</p>
                                </div>
                            )
                        }
                </header>
                <Menu />
                <div className="ace-content">{ this.props.children }</div>
            </div>
        )
    }
}
	

Wrapper.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
}

export default Wrapper