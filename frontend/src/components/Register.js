import React from "react";
import {Link, useHistory} from 'react-router-dom';
import Header from "./Header.js";
import * as auth from '../auth.js';
import union from '../images/Union.png';
import union_error from '../images/Union-error.png';

function Register ({onButtonClick}) {

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
        onButtonClick(email, password);
        // auth.register(email, password). then((res) => {
        //     if (res) {
        //         history.push('./sign-in');
        //         props.onButtonClick(true);
        //         props.text('Вы успешно зарегистрировались!')
        //         props.image(union)
        //     } else {
        //         props.onButtonClick(true);
        //         props.text('Что-то пошло не так! Попробуйте ещё раз.')
        //         props.image(union_error)
        //     }
        // })
    }

    function onLogin () {
        history.push('/sign-in');
    }


    return (
        <section>

            <div className="register">

                <h3 className="auth__title">Регистрация</h3>
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
                        id="password-input"
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
                        Зарегистрироваться
                    </button>

                    <p className="register__text">Уже зарегистрированы?
                        <Link to='sign-in' className="register__link"> Войти</Link>
                    </p>

                </form>
            </div>
        </section>
    );
}

export default Register;