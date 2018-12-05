import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import Wrapper from '../layout/Wrapper'

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push('/sign-in')
            }
        })
    }

    render() {
        return (
            <Wrapper hasShortcuts={false} />
        )
    }
}