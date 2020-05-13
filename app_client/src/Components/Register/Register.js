import React, { Component } from 'react';
import './Register.css';
import FormErrors from "../FormErrors/FormErrors";
import {Redirect} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            last_name: '',
            name: '',
            middle_name: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            serverOtvet: {success: false, msg: ''}
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.formValid) {
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
        }
    };

    render() {
        if (this.state.serverOtvet.success) {
            return <Redirect to='/login'/>;
        } else {
            return (
                <div>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <h1 className='text-center'>Регистрация</h1>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.serverOtvet}/>
                            <FormErrors formErrors={this.state.formErrors}/>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" required className="form-control" name="email"
                                   placeholder="Введите Email адрес"
                                   value={this.state.email}
                                   onChange={this.handleUserInput}/>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Введите пароль"
                                   value={this.state.password}
                                   onChange={this.handleUserInput}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="last_name">Фамилия:</label>
                            <input type="text" required className="form-control" name="last_name"
                                   placeholder="Введите фамилию"
                                   value={this.state.last_name}
                                   onChange={this.handleUserInput}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="name">Имя:</label>
                            <input type="text" required className="form-control" name="name"
                                   placeholder="Введите имя"
                                   value={this.state.name}
                                   onChange={this.handleUserInput}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="middle_name">Отчество:</label>
                            <input type="text" required className="form-control" name="middle_name"
                                   placeholder="Введите отчество"
                                   value={this.state.middle_name}
                                   onChange={this.handleUserInput}/>
                        </div>
                        <button type="submit" className="btn btn-primary register-button"
                                disabled={!this.state.formValid} onSubmit={this.handleSubmit}>Зарегистрироваться
                        </button>
                    </form>
                </div>


            )
        }
    }
}

export default Register;
