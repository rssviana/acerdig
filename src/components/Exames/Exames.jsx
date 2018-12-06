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

export default class Exames extends Component {
	constructor(props) {
		super(props)

		this.state = {
			docs: [],
		}

		this.handleDownload = this.handleDownload.bind(this)
		this.renderExames = this.renderExames.bind(this)
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

	renderExames() {
		return this.state.docs.map(file => {
			if (file.fileType === 'exame' || file.fileType === 'outros') {
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
			<Wrapper hasShortcuts={true}>
				<ul className="ace-recents">
					<h3>Artigos</h3>
					{this.renderExames()}
				</ul>
			</Wrapper>
		)
	}
}
