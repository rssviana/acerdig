import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { Link, Redirect } from 'react-router-dom'

import './SignIn.css'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            pass: '',
            isLogged: false,
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDisconectLogin = this.handleDisconectLogin.bind(this)
    }

    handleDisconectLogin() {
        firebase.auth().signOut().then(function () {
            alert('você foi desconectado com sucesso :)')
        }).catch(function (error) {
            alert('Por algum motivo, não foi efetuado o loggout! tente novamente mais tarde!')
        });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleLogin(e) {
        e.preventDefault()
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.login, this.state.pass)
            .then(user => {
                this.setState({ isLogged: true })
                console.log(user)
            })
            .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                if (errorCode === 'auth/invalid-email') { alert('email inválido.') }
                else if (errorCode === 'auth/user-not-found') { alert('Usuário não encontrado.') }
                else if (errorCode === 'auth/wrong-password') { alert('Senha incorreta.') }
                else { console.log(errorMessage) }
            })
    }

    render() {
        const isLoggedIn = this.state.isLogged

        return (
            <div>
                {isLoggedIn ? (
                    <Redirect to="/dashboard" />
                ) : (
                        <div className="ace-form_container">
                            <div className="ace-heading">
                                <h1 className="ace-heading__title">Acerdig</h1>
                                <p className="ace-heading__subtitle">Seu acervo digital</p>
                            </div>
                            <form className="ace-form" method="POST" action="" onSubmit={this.handleLogin}>
                                <fieldset>
                                    <legend>Sign In</legend>
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

                                    <button type="submit">Entrar</button>
                                </fieldset>
                                <Link className="ace-form__link" to="/sign-up">Cadastre-se</Link>
                            </form>
                        </div>
                    )}
            </div>
        )
    }
}

export default SignIn;