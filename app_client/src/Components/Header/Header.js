import {Link} from 'react-router-dom'
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends Component{

    get_cookie ( cookie_name )
    {
        let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }

    render() {
        if (this.get_cookie('Authorized') !== null){
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to='/' className="navbar-brand">Главная</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to='/technic' className="nav-link">Список техники<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/type_technic' className="nav-link">Список видов техники<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/client' className="nav-link">Список клиентов<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/master' className="nav-link">Список мастеров<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/logout' className="nav-link">Выйти</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/' className="navbar-brand">Главная</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Войти</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }

    }
}



export default Header;