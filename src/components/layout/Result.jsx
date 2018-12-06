import React from 'react'

class Result extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const file = this.props.hit
		return <span>{`${file.fileAutor} - ${file.fileName}`}</span>
	}
}

export default Result
