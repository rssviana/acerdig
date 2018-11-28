import React from 'react'

class Result extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render() {
        const file = this.props.hit
        return (
            <a href="#">{`${file.fileAutor} - ${file.fileName}`}</a>
        )
    }
}

export default Result