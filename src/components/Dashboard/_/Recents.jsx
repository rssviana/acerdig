import React from 'react'
import sample from '../../statics/images/book-icon.png'
import firebase from '../../../firebase'
import 'firebase/firestore'
import 'firebase/storage'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const storage = firebase.storage()

class Recents extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			docs: [],
		}

		this.handleDownload = this.handleDownload.bind(this)
		this.renderDocs = this.renderDocs.bind(this)
		this.updateFiles = this.updateFiles.bind(this)
	}

	updateFiles(snapshot) {
		const docs = snapshot.docs.map(doc => doc.data())
		this.setState({ docs })
	}

	componentDidMount() {
		db.collection('Files')
			.orderBy('created_at', 'desc')
			.onSnapshot(this.updateFiles)
	}

	handleDownload(uuid) {
		storage
			.ref(`Files/${uuid}`)
			.getDownloadURL()
			.then(function(url) {
				window.location = url
			})
			.catch(function(error) {
				alert('Não foi possivel realizar download no momento!')
			})
	}

	renderDocs() {
		return this.state.docs.map(file => {
			return (
				<li key={file.created_at} className="ace-recent">
					<figure className="ace-recent__figure">
						<img src={sample} alt={file.fileName} />
						<figcaption className="ace-recent__figcaption">
							{file.fileName}
						</figcaption>
					</figure>
					<b>{file.fileAutor}</b>
					<p>{file.fileType}</p>
					<div
						onClick={() => {
							this.handleDownload(file.fileReference)
						}}>
						Download
					</div>
				</li>
			)
		})
	}

	render() {
		return (
			<div className="ace-body">
				<h3 className="ace-recents__heading">Recentes</h3>
				<ul className="ace-recents">{this.renderDocs()}</ul>
			</div>
		)
	}
}

export default Recents
