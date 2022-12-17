import React from 'react';
import {Link, useLocation} from "react-router-dom";
import logo from '../images/logo-header.svg';

function Header({loggedIn, userData, deleteToken}) {
    const { pathname } = useLocation();
    const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

    return (
        <header className="header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
            <div className="header__part">
                {loggedIn ? (
                    <>
                        <p className= "header__text">{userData}</p>
                        <Link className="header__text grey" to="" onClick={deleteToken}>Выйти</Link>
                    </>) : (<Link to={linkRoute} className="header__text">{text}</Link>)
                }
            </div>
        </header>
    );
}

export default Header;