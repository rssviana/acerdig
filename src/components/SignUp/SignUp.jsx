import React from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            pass: '',
            logginIsCreated: false,
            loading: false,
        }

        this.handleSignup = this.handleSignup.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleSignup(e) {
        e.preventDefault()
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.login, this.state.pass)
            .then(user => {
                this.setState({ logginIsCreated: true, loading: false })
                console.log(user)
            })
            .catch(function (error) {
                console.error(error)
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
                            <form className="ace-form" method="POST" action="" onSubmit={this.handleSignup}>
                                <fieldset>
                                    <legend>Sign Up</legend>
                                    <p>
                                        <label htmlFor="login">Email</label>
                                        <input
                                            type="login"
                                            name="login"
                                            id="login"
                                            value={this.state.login}
                                            onChange={this.handleChange}
                                        />
                                    </p>
                                    <p>
                                        <label htmlFor="pass">Password</label>
                                        <input
                                            type="password"
                                            name="pass"
                                            id="pass"
                                            value={this.state.pass}
                                            onChange={this.handleChange}
                                        />
                                    </p>

                                    <button onClick={() => { this.setState({ loading: true }) }} type="submit">Cadastrar</button>
                                </fieldset>
                            </form>
                        </div>
                    )}
            </div>
        )
    }
}

export default Signup
