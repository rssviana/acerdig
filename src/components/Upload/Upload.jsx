import React from 'react'
import firebase from '../../firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import Wrapper from '../layout/Wrapper'
import Tags from './Tags'
import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import Loading from '../layout/Loading'

class UploadFile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			file: null,
			fileName: '',
			fileDescription: '',
			fileType: 'outros',
			currentUser: {
				displayName: '',
			},
			fileTags: [],
			isLoading: false,
		}

		this.handlechange = this.handlechange.bind(this)
		this.handleFile = this.handleFile.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
		this.onChangeFileTags = this.onChangeFileTags.bind(this)

		firebase
			.auth()
			.onAuthStateChanged(currentUser => this.setState({ currentUser }))
	}

	handlechange({ target }) {
		this.setState({
			[target.name]: target.value,
		})
	}

	handleFile({ target }) {
		console.log(target.files)
		this.setState({
			[target.name]: target.files[0],
		})
	}

	handleUpload(e) {
		e.preventDefault()

		this.setState({ isLoading: true })

		const {
			currentUser,
			file,
			fileName,
			fileType,
			fileDescription,
			fileTags,
		} = this.state

		const fileUuid = uuidv4()
		const fileAutor = currentUser.displayName

		const storage = firebase.storage()
		const firestore = firebase.firestore()

		const fileRef = storage
			.ref()
			.child('Files')
			.child(fileUuid)

		fileRef
			.put(file)
			.then(snapshot => {
				console.log('Uploaded file', snapshot)

				const ref = firestore.collection('Files')

				ref
					.add({
						fileName,
						fileDescription,
						fileAutor,
						fileType,
						fileTags,
						fileReference: fileUuid,
						userId: currentUser.uid,
						created_at: new Date(),
					})
					.then(snapshot => {
						this.setState({ isLoading: false })
						alert(
							'Arquivo enviado com sucesso! Sinta-se a vontade para subir mais arquivos.'
						)
					})
			})
			.catch(error => {
				this.setState({ loading: false })
				alert(
					'Houve um problema com o envio do arquivo! Tente novamente mais tarde.'
				)
			})
	}

	onChangeFileTags(fileTags) {
		this.setState({ fileTags })
	}

	render() {
		return (
			<Wrapper hasShortcuts={false}>
				{this.state.isLoading && <Loading />}
				<form
					className="ace-upload"
					method="POST"
					action=""
					onSubmit={this.handleUpload}>
					<h2>
						Faça upload de uma prova, artigo ou trabalho e ajude seus amigos
					</h2>
					<h3>Envie seu arquivo até 5mb</h3>
					<fieldset>
						<p>
							<label htmlFor="fileName">Nome do arquivo</label>
							<input
								type="text"
								name="fileName"
								id="filename"
								onChange={this.handlechange}
							/>
						</p>
						<p>
							<label htmlFor="description">Breve descrição</label>
							<textarea
								name="fileDescription"
								id="fileDescription"
								cols="30"
								rows="10"
								onChange={this.handlechange}
							/>
						</p>
						<p>
							<label htmlFor="fileAutor">Autor</label>
							<input
								type="text"
								name="fileAutor"
								id="fileAutor"
								readOnly
								value={this.state.currentUser.displayName}
							/>
						</p>
						<p>
							<label htmlFor="fileType">Tipo</label>
							<select
								name="fileType"
								id="fileType"
								onChange={this.handlechange}>
								<option value="outros">Outros</option>
								<option value="exame">Exame</option>
								<option value="artigo">Artigo</option>
								<option value="rabalho">Trabalho</option>
							</select>
						</p>
						<p>
							<span>
								Digite Tags relacionadas ao seu arquivo, depois aperte "Enter"
							</span>
							<Tags onChange={this.onChangeFileTags} />
						</p>
						<p>
							<label htmlFor="file">File</label>
							<input
								type="file"
								name="file"
								id="file"
								onChange={this.handleFile}
							/>
						</p>
						<button type="submit">Fazer Upload</button>
					</fieldset>
				</form>
			</Wrapper>
		)
	}
}

UploadFile.propTypes = {}

export default withRouter(UploadFile)
