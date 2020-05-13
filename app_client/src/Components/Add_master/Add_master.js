import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

const get_cookie = ( cookie_name ) =>
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Add_master extends Component{
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: '',
            last_name: '',
            name: '',
            middle_name: '',
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
    };
    render() {
        if (get_cookie('Authorized') === null){
            return <Redirect to="/login"/>;
        }else
        if (this.state.serverOtvet.success){
            return (<Redirect to="/master"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1 className='text-center text-dark'>Добавление мастера</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group`}>
                                <label htmlFor="email">E-mail</label>
                                <input type="text" required className="form-control" name="email"
                                       placeholder="Введите e-mail"
                                       value={this.state.email}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="password">Пароль</label>
                                <input type="password" required className="form-control" name="password"
                                       placeholder="Введите пароль"
                                       value={this.state.password}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="last_name">Фамилия мастера</label>
                                <input type="text" required className="form-control" name="last_name"
                                       placeholder="Введите фамилию"
                                       value={this.state.last_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="name">Имя мастера</label>
                                <input type="text" required className="form-control" name="name"
                                       placeholder=" Введите имя"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="middle_name">Отчество мастера</label>
                                <input type="text" required className="form-control" name="middle_name"
                                       placeholder="Введите отчество"
                                       value={this.state.middle_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit}
                                   value='Отправить'/>
                        </form>
                    </div>
                </div>

            );
        }
    }

}
export default Add_master;