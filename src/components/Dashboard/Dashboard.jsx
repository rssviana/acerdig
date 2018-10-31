import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../layout/Wrapper'
import Recents from '../layout/Recents'

import './Dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <Recents />
                </Wrapper>
            </div>
        )
    }
}
