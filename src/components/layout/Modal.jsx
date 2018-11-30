import React, { Component } from 'react'
import { oneOfType, element, arrayOf } from 'prop-types'
import Modal from 'react-modal'

class Modal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const outside = this.props
        return (
            <Modal
                isOpen={outside.modalIsOpen}
                onAfterOpen={outside.afterOpenModal}
                onRequestClose={outside.closeModal}
                contentLabel={outside.label}
            >
                {outside.children}
            </ Modal>
        )
    }

}

Modal.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
}

export default Modal