import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import Wrapper from '../layout/Wrapper'
import Recents from '../layout/Recents'

import './Dashboard.css'

window.fire = firebase

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: null,
        }

        firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }))
    }
    render() {
        return (
            <div>
                <Wrapper hasMenu={true} hasShortcuts={true}>
                    <Recents />
                </Wrapper>
            </div>
        )
    }
}
