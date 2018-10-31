import React from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { Redirect, withRouter } from 'react-router-dom'

class Signup2 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            avatar: '',
            baseUrl: 'https://firebasestorage.googleapis.com/v0/b/acerdig-4edc5.appspot.com/o/avatars%2F',
            avatarURL: [
                'boy-1.png', 'boy.png', 'girl.png', 'girl-1.png', 'man-1.png', 'man-2.png', 'man-3.png', 'man-4.png', 'man.png'
            ],
            currentAvtr: '',
            currentUser: null,
        }

        this.handleChange = this.handleChange.bind(this)
        this.renderAvatars = this.renderAvatars.bind(this)
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this)

        firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }))
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        })
    }

    renderAvatars() {
        return this.state.avatarURL.map((filename) => {
            return <li key={filename} onClick={(e) => {
                this.setState({ currentAvtr: filename })
            }} className="ace-form__avatar"><img src={`${this.state.baseUrl}${filename}?alt=media`} alt="avatar" /></li>
        })
    }

    handleUpdateProfile(e) {
        e.preventDefault()
        const user = this.state.currentUser

        const photoURL = `${this.state.baseUrl}${this.state.currentAvtr}?alt=media`

        console.log({ photoURL, user })

        user.updateProfile({
            displayName: this.state.displayName,
            photoURL
        }).then(() => {
            this.props.history.push('/dashboard')
        }).catch(error => {
            alert('Não foi possivel alterar seus dados no momento, tente novamente mais tarde !')
        })
    }

    render() {
        const logginIsCreated = this.state.logginIsCreated

        return (
            <div>
                {logginIsCreated ? (
                    <Redirect to="/dashboard" />
                ) : (
                        <div className="ace-form_container">
                            <div className="ace-heading">
                                <h1 className="ace-heading__title">Acerdig</h1>
                                <p className="ace-heading__subtitle">Seu acervo digital</p>
                            </div>
                            <form className="ace-form" method="POST" action="" onSubmit={this.handleUpdateProfile}>
                                <fieldset>
                                    <legend>Mais Informações</legend>
                                    <ul className="ace-form__listofavatars">
                                        {this.renderAvatars()}
                                    </ul>
                                    <p>
                                        <label htmlFor="displayName">Name</label>
                                        <input
                                            type="displayName"
                                            name="displayName"
                                            id="displayName"
                                            value={this.state.displayName}
                                            onChange={this.handleChange}
                                        />
                                    </p>
                                    <button type="submit">Cadastrar</button>
                                </fieldset>
                            </form>
                        </div>
                    )}
            </div>
        )
    }
}

export default withRouter(Signup2)
