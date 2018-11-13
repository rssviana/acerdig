import React from 'react'
import firebase from '../../firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import Wrapper from '../layout/Wrapper'
import Tags from './Tags'

class UploadFile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
            fileName: '',
            fileDescription: '',
            fileType: '',
            currentUser: {
                displayName: '',
            },
            fileTags: [],
        }

        this.handlechange = this.handlechange.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.onChangeFileTags = this.onChangeFileTags.bind(this)

        firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }))
    }

    handlechange({ target }) {
        this.setState({
            [target.name]: target.value
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

        const {
            currentUser,
            file,
            fileName,
            fileType,
            fileDescription,
            fileTags,
        } = this.state

        const fileAutor = currentUser.displayName

        const storage = firebase.storage()
        const firestore = firebase.firestore()

        const uuidFile = '12345'

        const fileRef = storage.ref().child(fileType).child(uuidFile)

        // Upload file and set properties on Firestore
        fileRef.put(file)
            .then(snapshot => {
                console.log('Uploaded file', snapshot)

                const ref = firestore.collection(fileType)

                ref.add({
                    fileName,
                    fileDescription,
                    fileAutor,
                    fileType,
                    fileTags,
                    fileReference: uuidFile,
                    userId: currentUser.uid,
                    created_at: new Date(),
                }).then(snapshot => {
                    this.setState({ loading: false })
                    console.log("File properties saved", snapshot)
                    alert('Arquivo enviado com sucesso!')
                })
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log("Uploaded file error", error)
                alert('Houve um problema com o envio do arquivo! Tente novamente mais tarde.')
            })
    }

    onChangeFileTags(fileTags) {
        this.setState({ fileTags })
    }

    render() {
        return (
            <Wrapper hasMenu={false} hasShortcuts={false}>
                <form method="POST" action="" onSubmit={this.handleUpload}>
                    <fieldset>
                        <legend>Envie seu arquivo até 5mb</legend>
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
                            ></textarea>
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
                            <select name="fileType" id="fileType" onChange={this.handlechange}>
                                <option value="outros">Outros</option>
                                <option value="exame">Exame</option>
                                <option value="artigo">Artigo</option>
                                <option value="rabalho">Trabalho</option>
                            </select>
                        </p>
                        <Tags onChange={this.onChangeFileTags} />
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

export default UploadFile
