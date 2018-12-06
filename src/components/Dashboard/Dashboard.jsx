import React, { Component } from 'react'
import Wrapper from '../layout/Wrapper'
import Recents from './_/Recents'

class Dashboard extends Component {
	render() {
		return (
			<Wrapper hasShortcuts={true}>
				<Recents />
			</Wrapper>
		)
	}
}

export default Dashboard
