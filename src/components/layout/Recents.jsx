import React from 'react'
import { Link } from 'react-router-dom'
import sample from '../statics/images/sample.jpg'
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
        db.collection('exame').orderBy("created_at", "desc").onSnapshot(this.updateFiles)
    }

    renderDocs() {
        return (
            this.state.docs.map(file => {
                return <div>{file.fileName}</div>
            })
        )
    }

    render() {
        return (
            <div>
                <ul className="ace-recents">
                    <h3>Artigos</h3>
                    {this.renderDocs()}
                    <li className="ace-recent">
                        <figure className="ace-recent__figure">
                            <img src={sample} alt="Prova de Física" />
                            <figcaption className="ace-recent__figcaption">Prova de Física</figcaption>
                        </figure>
                        <Link to="/">Ver +</Link>
                        <Link to="/">Download</Link>
                    </li>
                </ul>
                <ul className="ace-recents">
                    <h3>Exames</h3>
                    <li className="ace-recent">
                        <figure className="ace-recent__figure">
                            <img src={sample} alt="Prova de Física" />
                            <figcaption className="ace-recent__figcaption">Prova de Física</figcaption>
                        </figure>
                        <Link to="/">Ver +</Link>
                        <Link to="/">Download</Link>
                    </li>
                </ul>
                <ul className="ace-recents">
                    <h3>Trabalhos</h3>
                    <li className="ace-recent">
                        <figure className="ace-recent__figure">
                            <img src={sample} alt="Prova de Física" />
                            <figcaption className="ace-recent__figcaption">Prova de Física</figcaption>
                        </figure>
                        <Link to="/">Ver +</Link>
                        <Link to="/">Download</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Recents