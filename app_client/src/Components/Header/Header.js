import {Link} from 'react-router-dom'
import React, {Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

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
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand><Link className="text-white" to='/'>ПочиниКА</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link><Link className="text-white" to='/price-list'>Прайс-лист</Link></Nav.Link>
                                <Nav.Link><Link className="text-white" to='/orders'>Заказы</Link></Nav.Link>
                                <NavDropdown title="Техника" id="collasible-nav-dropdown">
                                    <Nav.Link><Link className="text-dark" to='/technic'>Список техники</Link></Nav.Link>
                                    <Nav.Link><Link className="text-dark" to='/type-technic'>Виды техники</Link></Nav.Link>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title={localStorage.getItem('fio')} id="collasible-nav-dropdown">
                                    <Nav.Link><Link className="text-dark" to='/client'>Клиенты</Link></Nav.Link>
                                    <Nav.Link><Link className="text-dark" to='/master'>Мастера</Link></Nav.Link>
                                </NavDropdown>
                                <Nav.Link><Link className="text-white" to='/logout'>Выйти</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/">Главная</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link><Link className="text-white" to='/price-list'>Прайс-лист</Link></Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link><Link className="text-white" to='/login'>Войти</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }

    }
}



export default Header;