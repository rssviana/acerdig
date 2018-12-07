import React, { Component } from 'react'
import sample from '../statics/images/book-icon.png'
import Wrapper from '../layout/Wrapper'
import firebase from '../../firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const db = firebase.firestore()
const storage = firebase.storage()
db.settings({ timestampsInSnapshots: true })

export default class Things extends Component {
	constructor(props) {
		super(props)

		this.state = {
			docs: [],
		}

		this.handleDownload = this.handleDownload.bind(this)
		this.renderMyThings = this.renderMyThings.bind(this)
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

	renderMyThings() {
		return this.state.docs.map(file => {
			if (file.fileAutor === this.props.currentUser.displayName) {
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
			}
		})
	}

	render() {
		return (
			<Wrapper hasShortcuts={false}>
				<h3 className="ace-recents__heading">Meus Arquivos</h3>
				<ul className="ace-recents">{this.renderMyThings()}</ul>
			</Wrapper>
		)
	}
}
