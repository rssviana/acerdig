import React, { Component } from 'react'
import Wrapper from '../layout/Wrapper'
import Recents from '../layout/Recents'
import protect from '../protect'

class Dashboard extends Component {
	render() {
		console.log('Dashboard props:', this.props)
		return (
			<Wrapper hasShortcuts={true}>
				<Recents />
			</Wrapper>
		)
	}
}

export default Dashboard
