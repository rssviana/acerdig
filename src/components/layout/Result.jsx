import React from 'react'
import firebase from '../../firebase'
import 'firebase/storage'

const storage = firebase.storage()

class Result extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	handleDownload(uuid) {
		storage
			.ref(`Files/${uuid}`)
			.getDownloadURL()
			.then(url => {
				window.location = url
			})
			.catch(error => {
				alert('Não foi possivel realizar download no momento!')
			})
	}

	render() {
		const file = this.props.hit
		return (
			<span
				onClick={() => {
					this.handleDownload(file.fileReference)
				}}
				download>{`${file.fileAutor} - ${file.fileName}`}</span>
		)
	}
}

export default Result
