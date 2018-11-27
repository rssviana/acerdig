import React from 'react'
import { Link } from 'react-router-dom'
import sample from '../statics/images/book-icon.png'
import firebase from '../../firebase'
import 'firebase/firestore'

const db = firebase.firestore()

class Recents extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            docs: []
        }

        this.updateFiles = this.updateFiles.bind(this)
        this.renderDocs = this.renderDocs.bind(this)
    }

    updateFiles(snapshot) {
        const docs = snapshot.docs.map(doc => doc.data())
        this.setState({ docs })
    }

    componentDidMount() {
        db.collection('Files').orderBy("created_at", "desc").onSnapshot(this.updateFiles)
    }

    renderDocs() {
        return (
            this.state.docs.map(file => {
                return(
                    <li className="ace-recent">
                        <figure className="ace-recent__figure">
                            <img src={sample} alt={file.fileName} />
                            <figcaption className="ace-recent__figcaption">{file.fileName}</figcaption>
                        </figure>
                        <b>{file.fileAutor}</b>
                        <p>{file.fileType}</p>
                        {/* <Link to="/">Ver +</Link> */}
                        <Link to="/">Download</Link>
                    </li>

                ) 
            })
        )
    }

    render() {
        return (
            <div className="ace-body">
                <ul className="ace-recents">
                    <h3>Recentes</h3>
                    {this.renderDocs()}
                </ul>
            </div>
        )
    }
}

export default Recents