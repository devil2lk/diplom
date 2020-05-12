import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Select from 'react-select';

const get_cookie = ( cookie_name ) =>
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Add_technic extends Component{
    constructor(props) {
        super(props);
        this.state= {
            type_t: '',
            name: '',
            maker: '',
            date_make: '',
            price: '',
            type_t_list: null,
            selectedOption_type_t: null,
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleChange_type_t = selectedOption_type_t => {
        this.setState({ selectedOption_type_t });
        let formBody=[];
        for (let prop in selectedOption_type_t){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_type_t[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/type_t/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({type_t: data}))
            .catch(err => console.log("err: =" + err));
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
        fetch('/api/technic', {
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
        const { selectedOption_type_t } = this.state;
        if (this.state.type_t_list === null){
            fetch('/api/type_t/list').then(res => res.json())
                .then(data => this.setState({type_t_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (get_cookie('Authorized') === null){
            return <Redirect to="/Login"/>;
        }else
        if (this.state.serverOtvet.success){
            return (<Redirect to="/Technic"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1 className='text-center text-dark'>Добавление техники</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="type_t" className='col-sm-5'>Вид техники</label>
                                <Select
                                    className='col-sm-7'
                                    placeholder="Выберите вид"
                                    value={selectedOption_type_t}
                                    onChange={this.handleChange_type_t}
                                    options={this.state.type_t_list}
                                />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="name" className='col-sm-5'>Наименование</label>
                                <input type="text" required className="form-control col-sm-8" name="name"
                                       placeholder=" Введите наименование"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="maker" className='col-sm-5'>Производитель</label>
                                <input type="text" required className="form-control col-sm-8" name="maker"
                                       placeholder="Введите производителя"
                                       value={this.state.maker}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="date_make" className='col-sm-5'>Дата производства</label>
                                <input type="date" required className="form-control col-sm-8" name="date_make"
                                       placeholder="Введите дату производства"
                                       value={this.state.date_make}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="price" className='col-sm-5'>Цена</label>
                                <input type="number" required className="form-control col-sm-8" name="price"
                                       placeholder="Введите примерную цену техники"
                                       value={this.state.price}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit}
                                   value='Добавить'/>
                        </form>
                    </div>
                </div>

            );
        }
    }

}
export default Add_technic;