import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../layout/Wrapper'

import './Dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <h2>All the contents comes here!</h2>
                    <Link to="/upload">Contribua</Link>
                </Wrapper>
            </div>
        )
    }
}
