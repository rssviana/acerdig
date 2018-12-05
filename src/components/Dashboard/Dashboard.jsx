import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import Wrapper from '../layout/Wrapper'
import Recents from '../layout/Recents'


window.fire = firebase

export default class Dashboard extends Component {
    constructor(props){
        super(props)

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if( !user ) {
                this.props.history.push('/sign-in')
            }
        })
    }

    render() {
        return (
            <Wrapper hasMenu={true} hasShortcuts={true}>
                <Recents />
            </Wrapper>    
        )
    }
}
