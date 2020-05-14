import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            serverOtvet: ''
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
        console.log(this.state.serverOtvet);
    };

    render() {
        if (this.state.serverOtvet.success) {
            localStorage.setItem('fio', this.state.serverOtvet.user);
            window.location.assign('http://localhost:3000/technic');

            } else {
                return (
                    <div>
                        <div>
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <h1 className='text-center text-login'>Вход</h1>
                                <div className="panel panel-default">
                                </div>
                                <div className={`form-group`}>
                                    <label htmlFor="login">Email:</label>
                                    <input type="email" required className="form-control" name="email"
                                           placeholder="Введите Email адрес"
                                           value={this.state.email}
                                           onChange={this.handleUserInput}/>
                                </div>

                                <div className={`form-group`}>
                                    <label htmlFor="password">Пароль:</label>
                                    <input type="password" required className="form-control" name="password"
                                           placeholder="Введите пароль"
                                           value={this.state.password}
                                           onChange={this.handleUserInput}/>
                                </div>
                                <input type="submit" className="btn btn-primary login-button" value='Войти'/>
                            </form>
                        </div>

                        <div className='text-center'>
                            Нет аккаунта?
                            <Link to="/register"> Зарегистрироваться</Link>
                        </div>
                    </div>
                );
            }
        }
}
export default Login;