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

class Add_orders extends Component{
    constructor(props) {
        super(props);
        this.state= {
            type_t: '',
            name_service: '',
            name: '',
            fio_client: '',
            fio: localStorage.getItem("fio"),
            price: '',
            type_t_list: null,
            selectedOption_type_t: null,
            name_service_list: null,
            selectedOption_name_service: null,
            name_list: null,
            selectedOption_name: null,
            fio_client_list: null,
            selectedOption_fio_client: null,
            fio_list: null,
            selectedOption_fio: null,
            price_list: null,
            selectedOption_price: null,
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
    handleChange_name_service = selectedOption_name_service => {
        this.setState({ selectedOption_name_service });
        let formBody=[];
        let formPrice=[];
        for (let prop in selectedOption_name_service){
            formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_name_service[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/name_service/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({name_service: data}))
            .then(db => {
                for (let prop in this.state.name_service){
                        formPrice.push(encodeURIComponent('_id') + "=" + encodeURIComponent(this.state.name_service[prop]));
                    }
                    formPrice = formPrice.join("&");
                    fetch('/api/price/list', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formPrice
                    }).then(res => res.json())
                        .then(data => this.setState({price: data}))
                }
            )
            .catch(err => console.log("err: =" + err));
    };
    handleChange_name = selectedOption_name => {
        this.setState({ selectedOption_name });
        let formBody=[];
        for (let prop in selectedOption_name){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_name[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/name/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({name: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleChange_fio_client = selectedOption_fio_client => {
        this.setState({ selectedOption_fio_client });
        let formBody=[];
        for (let prop in selectedOption_fio_client){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_fio_client[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/fio_client/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({fio_client: data}))
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
        fetch('/api/orders', {
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
        const { selectedOption_name_service } = this.state;
        const { selectedOption_name } = this.state;
        const { selectedOption_fio_client } = this.state;
        if (this.state.type_t_list === null){
            fetch('/api/type_t/list').then(res => res.json())
                .then(data => this.setState({type_t_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.name_service_list === null){
            fetch('/api/name_service/list').then(res => res.json())
                .then(data => this.setState({name_service_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.name_list === null){
            fetch('/api/name/list').then(res => res.json())
                .then(data => this.setState({name_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.fio_client_list === null){
            fetch('/api/fio_client/list').then(res => res.json())
                .then(data => this.setState({fio_client_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (get_cookie('Authorized') === null){
            return <Redirect to="/login"/>;
        }else
        if (this.state.serverOtvet.success){
            return (<Redirect to="/orders"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1 className='text-center text-dark'>Добавление заказа</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group`}>
                                <label htmlFor="type_t">Вид техники</label>
                                <Select
                                    placeholder="Выберите вид"
                                    value={selectedOption_type_t}
                                    required={true}
                                    onChange={this.handleChange_type_t}
                                    options={this.state.type_t_list}
                                />
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="name_service">Наименование услуги</label>
                                <Select
                                    placeholder="Выберите наименование"
                                    value={selectedOption_name_service}
                                    required={true}
                                    onChange={this.handleChange_name_service}
                                    options={this.state.name_service_list}
                                />
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="name">Наименование техники</label>
                                <Select
                                    placeholder="Выберите наименование"
                                    value={selectedOption_name}
                                    required={true}
                                    onChange={this.handleChange_name}
                                    options={this.state.name_list}
                                />
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="fio_client">ФИО клиента</label>
                                <Select
                                    placeholder="Выберите ФИО клиента"
                                    value={selectedOption_fio_client}
                                    required={true}
                                    onChange={this.handleChange_fio_client}
                                    options={this.state.fio_client_list}
                                />
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="fio">ФИО мастера</label>
                                <input type="text" required className="form-control" name="fio"
                                       disabled
                                       value={localStorage.getItem("fio")}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="price">Цена услуги</label>
                                <input type="number" required className="form-control" name="price"
                                       disabled
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
export default Add_orders;