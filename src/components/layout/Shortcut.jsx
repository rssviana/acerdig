import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Shortcut.css'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import Result from './Result'
import Modal from 'react-modal'

class Shortcut extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
        }

        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    render() {
        return (
            <div>
                <div className="ace-shortcut__search" onClick={this.openModal}>Pesquisar arquivo</div>
                <Modal
                    contentLabel="Search"
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <InstantSearch
                        appId="DSOE9C9RBR"
                        apiKey="240741f8fc28172e9a92e20eedd0633f"
                        indexName="Files"
                    >
                        <SearchBox />
                        <Hits hitComponent={Result} escapeHits={true} />
                    </InstantSearch>
                </Modal>

                <div className="ace-shortcut">
                    <div className="ace-shortcut__item"><Link to="/trabalhos">Trabalhos</Link></div>
                    <div className="ace-shortcut__item"><Link to="/exames">Provas</Link></div>
                    <div className="ace-shortcut__item"><Link to="/artigos">Artigos</Link></div>
                    <div className="ace-shortcut__item"><Link to="/upload">Contribua</Link></div>
                </div>
            </div>
        )
    }
}

export default Shortcut