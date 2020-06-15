import React, {Component} from "react";
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const regExpFIO = /^[А-ЯA-Z]{1}[а-яa-zА-ЯA-Z]{1,}$/;
const regExpNumber = /^\d[\d\(\)\ -]{4,14}\d$/;
const regExpEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
let formBody = [];

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Client extends Component{


    state = {
        serverOtvet: '',
        products: [],
        columns: [{
            dataField: '_id',
            isKey: true,
            hidden: true
        }, {
            dataField: 'last_name',
            text: 'Фамилия',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpFIO.test(newValue)) {
                    return {
                        valid: false,
                        message: 'С заглавной буквы без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'last_name'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }
                    if (prop === '_id'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }

                }
                formBody = formBody.join("&");
                fetch('/api/client/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/client/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        }, {
            dataField: 'name',
            text: 'Имя',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpFIO.test(newValue)) {
                    return {
                        valid: false,
                        message: 'С заглавной буквы без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'name'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }
                    if (prop === '_id'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }

                }
                formBody = formBody.join("&");
                fetch('/api/client/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/client/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },

        },{
            dataField: 'middle_name',
            text: 'Отчество',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpFIO.test(newValue)) {
                    return {
                        valid: false,
                        message:  'С заглавной буквы без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'middle_name'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }
                    if (prop === '_id'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }

                }
                formBody = formBody.join("&");
                fetch('/api/client/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/client/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        },{
                dataField: 'phone_number',
                text: 'Номер телефона',
                selected: false,
            validator: (newValue, row, column) => {
                if (!regExpNumber.test(newValue)) {
                    return {
                        valid: false,
                        message: 'От 4 до 14 цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'phone_number'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }
                    if (prop === '_id'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }

                }
                formBody = formBody.join("&");
                fetch('/api/client/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/client/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        },{
                dataField: 'e_mail',
                text: 'Адрес эл. почты',
                selected: false,
            validator: (newValue, row, column) => {
                if (!regExpEmail.test(newValue)) {
                    return {
                        valid: false,
                        message: 'В формате электронной почты'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'e_mail'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }
                    if (prop === '_id'){
                        if (prop === column.dataField){
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(newValue);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }else {
                            let encodedKey = encodeURIComponent(prop);
                            let encodedValue = encodeURIComponent(row[prop]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                    }

                }
                formBody = formBody.join("&");
                fetch('/api/client/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/client/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
            }
        ],
        selected: []
    };

    componentDidMount() {
        fetch('/api/client').then(res => res.json())
            .then(data => this.setState({products: data}))
            .catch(err => console.log("err: =" + err));
    }

    handleGetSelectedData = () => {
        if (window.confirm('Вы действительно хотите удалить?')){
            let formBody = [];
            for (let prop in this.state) {
                let encodedKey = encodeURIComponent(prop);
                let encodedValue = encodeURIComponent(this.state[prop]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('/api/client/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .then(del =>  window.location.assign('http://localhost:3000/client'));

        }

    };

    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row._id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row._id)
            }));
        }
    };

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: [0,]
            }));
        }
    };


    render() {

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            bgColor: 'rgba(255, 0, 0, 0.39)',
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll,
            headerColumnStyle: (status) => {
                if (status === 'checked') {
                    return {
                        backgroundColor: 'rgba(255, 0, 0, 0.39)'
                    };
                } else if (status === 'indeterminate') {
                    return {
                        backgroundColor: 'white'
                    };
                } else if (status === 'unchecked') {
                    return {
                        backgroundColor: 'white'
                    };
                }
                return {};
            }
        };
        if (get_cookie('Authorized') === null){
            window.location.assign('http://localhost:3000/login');
        } else {
            return (
                <div>
                    <h1 className="list_h1">Список клиентов</h1>
                    <div>
                        <div className="buttons">
                            <Link to='/add-client'><Button variant="success">Добавить</Button></Link>
                            <Button onClick={ this.handleGetSelectedData } className='btn_close' variant="dark">Удалить</Button>
                        </div>
                        <div className="table">
                            <BootstrapTable
                                onDataSizeChange={ this.handleDataChange }
                                keyField={'_id'}
                                data={ this.state.products }
                                columns={ this.state.columns }
                                cellEdit={
                                    cellEditFactory({
                                        mode: 'dbclick',
                                        blurToSave: true,
                                    })
                                }
                                selectRow={ selectRow }
                                hover
                                noDataIndication="Нет записей"
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Client;