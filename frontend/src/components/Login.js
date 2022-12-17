import React from "react";
import * as auth from '../auth.js';
import {withRouter, useHistory} from 'react-router-dom';
import Header from "./Header.js";

function Login ({onAuthorize}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    let history = useHistory();

    function handleChangeEmail (e) {
        setEmail (e.target.value)
    }

    function handleChangePassword (e) {
        setPassword (e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        setEmail('')
        setPassword('')
        onAuthorize(email, password)
        // auth.authorize(email, password)
        //     .then ((data) => {
        //         if (data.token) {
        //             setEmail('')
        //             setPassword('')
        //             props.handleLogin (e)
        //             props.tokenCheck()
        //             history.push('/')
        //         }
        //     })
        //     .catch (err => console.log(err));
    }

    function onRegister () {
        history.push('/sign-up');
    }

    return (
        <section>
            <div className="login">

                <h3 className="auth__title">Вход</h3>
                <form className=" popup__form auth__form" name='login-form' noValidate onSubmit={handleSubmit}>

                    <input
                        id="email-input"
                        value= {email}
                        onChange={handleChangeEmail}
                        className="popup__input auth__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        required />

                    <input
                        id="password-input-login"
                        value={password}
                        onChange={handleChangePassword}
                        className="popup__input auth__input"
                        type="password" name="password"
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="200"
                        required />

                    <button
                        className="popup__button auth__button"
                        type="submit">
                        Войти
                    </button>

                </form>
            </div>
        </section>
    );
}

export default withRouter (Login);