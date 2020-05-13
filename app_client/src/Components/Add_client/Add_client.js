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

class Add_client extends Component{
    constructor(props) {
        super(props);
        this.state= {
            last_name: '',
            name: '',
            middle_name: '',
            phone_number: '',
            e_mail: '',
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
        fetch('/api/client', {
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
            return (<Redirect to="/client"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1 className='text-center text-dark'>Добавление клиента</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group`}>
                                <label htmlFor="last_name">Фамилия клиента</label>
                                <input type="text" required className="form-control" name="last_name"
                                       placeholder="Введите фамилию"
                                       value={this.state.last_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="name">Имя клиента</label>
                                <input type="text" required className="form-control" name="name"
                                       placeholder=" Введите имя"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="middle_name">Отчество клиента</label>
                                <input type="text" required className="form-control" name="middle_name"
                                       placeholder="Введите отчество"
                                       value={this.state.middle_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="phone_number">Номер телефона</label>
                                <input type="text" required className="form-control" name="phone_number"
                                       placeholder="Введите номер телефона"
                                       value={this.state.phone_number}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="e_mail">Адрес эл. почты</label>
                                <input type="text" required className="form-control" name="e_mail"
                                       placeholder="Введите e-mail"
                                       value={this.state.e_mail}
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
export default Add_client;