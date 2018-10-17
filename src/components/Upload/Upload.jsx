import React from 'react'
import firebase from '../../firebase'
import 'firebase/storage'
import 'firebase/auth'

class UploadFile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
        }

        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleFile({ target }) {
        console.log(target.files)
        this.setState({
            [target.name]: target.files[0],
        })
    }

    handleUpload(e) {
        e.preventDefault()
        const storage = firebase.storage()
        const storageRef = storage.ref()
        const spaceRef = storageRef.child(`images/${this.state.file.name}`)

        console.log(firebase.auth())

        spaceRef.put(this.state.file).then(function (snapshot) {
            console.log('Uploaded a blob or file!', snapshot)
        })
    }

    render() {
        return (
            <form method="" action="" onSubmit={this.handleUpload}>
                <fieldset>
                    <legend>Envie seu arquivo até 5mb</legend>
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
        )
    }
}

UploadFile.propTypes = {}

export default UploadFile
