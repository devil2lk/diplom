import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import FormErrors from "../FormErrors/FormErrors";

const get_cookie = ( cookie_name ) =>
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

const regExpFIO = /^[А-ЯA-Z]{1}[а-яa-zА-ЯA-Z]{1,}$/;
const regExpNumber = /^\d[\d\(\)\ -]{4,14}\d$/;

class Add_client extends Component{
    constructor(props) {
        super(props);
        this.state= {
            last_name: '',
            name: '',
            middle_name: '',
            phone_number: '',
            e_mail: '',
            formErrors: {email: '', phone_number: '', last_name: '', name: '', middle_name: ''},
            emailValid: false,
            phone_numberValid: false,
            last_nameValid: false,
            nameValid: false,
            middle_nameValid: false,
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
        let phone_numberValid = this.state.passwordValid;
        let last_nameValid = this.state.last_nameValid;
        let nameValid = this.state.nameValid;
        let middle_nameValid = this.state.middle_nameValid;

        switch (fieldName) {
            case 'e_mail':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.e_mail = emailValid ? '' : ' is invalid';
                break;
            case 'phone_number':
                phone_numberValid = regExpNumber.test(value);
                fieldValidationErrors.phone_number = phone_numberValid ? '' : ' 6 to 14 number';
                break;
            case 'last_name':
                last_nameValid = regExpFIO.test(value);
                fieldValidationErrors.last_name = last_nameValid ? '' : ' with big letter';
                break;
            case 'name':
                nameValid = regExpFIO.test(value);
                fieldValidationErrors.name = nameValid ? '' : ' with big letter';
                break;
            case 'middle_name':
                middle_nameValid = regExpFIO.test(value);
                fieldValidationErrors.middle_name = middle_nameValid ? '' : ' with big letter';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            phone_numberValid: phone_numberValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if (this.state.formValid) {
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
        }
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
                    <div className="panel panel-default text-center alert-danger">
                        <FormErrors formErrors={this.state.serverOtvet}/>
                        <FormErrors formErrors={this.state.formErrors}/>
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
                            <input type="submit" className="btn btn-success" onSubmit={this.handleSubmit}
                                   value='Добавить'/>
                        </form>
                    </div>
                </div>

            );
        }
    }

}
export default Add_client;