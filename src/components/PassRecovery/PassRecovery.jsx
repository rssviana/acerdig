import React, { Component } from 'react'
import firebase from '../../firebase'
import 'firebase/auth'
import { withRouter } from 'react-router-dom'
import Loading from '../layout/Loading'

class PassRecovery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            login: '',
        }
       
        this.handleChange = this.handleChange.bind(this)
        this.handleLoading =  this.handleLoading.bind(this)
        this.handleLostPass = this.handleLostPass.bind(this)
        this.goHome = this.goHome.bind(this)
    }

    goHome(){
        this.props.history.push('/sign-in')
    }

    handleLoading(condition) {
        if(condition === true) {
            this.setState({ isLoading: true })
        } else {
            this.setState({ isLoading: false })
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleLostPass() {
        const auth = firebase.auth()
        auth.sendPasswordResetEmail(this.state.login).then(function () {
            alert("Um email foi enviado para você com mais detalhes para a recuperação de senha.")
            this.props.history.push('/sign-in')
        }).catch(function (error) {
            alert("Por algum motivo não conseguimos enviar o email de recuperação. Tente novamente mais tarde.")
        })
    }

    componentWillMount() {
        this.setState({ isLoading: false })
    }

    render() {
        const isLoading = this.state.isLoading
        return (
            <div className="ace-passrecovery">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="ace-form_container">
                        <div className="ace-heading">
                            <h1 className="ace-heading__title" onClick={this.goHome}>Acerdig</h1>
                            <p className="ace-heading__subtitle">Seu acervo digital</p>
                        </div>
                        <form action="" className="ace-form" method="" onSubmit={this.handleLostPass}>
                            <fieldset>
                                <legend>Recupere sua senha</legend>
                                <p>Por favor, insira seu email para que possamos enviar um email de recuperação de senha.</p>
                                <p>
                                    <label htmlFor="login">Email</label>
                                    <input
                                        type="login"
                                        name="login"
                                        id="login"
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit">Recuperar senha</button>
                                </p>
                            </fieldset>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(PassRecovery)