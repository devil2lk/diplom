import React, {Component} from "react";
import './Technic.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const regExpName =/(^[А-ЯA-Z]{1} [а-яa-z]{1,}$)|(^[А-ЯA-Z]{1} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,}$)/;
const regExpPrice = /^\d+$/;

let formBody = [];

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Technic extends Component{


    state = {
        serverOtvet: '',
        products: [],
        columns: [{
            dataField: '_id',
            isKey: true,
            hidden: true
        }, {
            dataField: 'type_t',
            text: 'Вид техники',
            selected: false,
            editable: false
        }, {
            dataField: 'name',
            text: 'Наименование ',
            selected: false,
            validator: (newValue, row, column) => {
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
                fetch('/api/technic/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/technic/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },

        },{
            dataField: 'maker',
            text: 'Производитель',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpName.test(newValue)) {
                    return {
                        valid: false,
                        message: 'С заглавной буквы без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
                    if (prop === 'maker'){
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
                fetch('/api/technic/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/technic/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        },
            {
                dataField: 'date_make',
                text: 'Дата производства',
                selected: false,
                editor: {
                    type: Type.DATE,
                },
                validator: (newValue, row, column) => {
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'date_make'){
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
                    fetch('/api/technic/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/technic/'))
                        .catch(err => console.log("err: =" + err));

                },
            },
            {
                dataField: 'price',
                text: 'Цена',
                selected: false,
                validator: (newValue, row, column) => {
                    if (!regExpPrice.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Без букв'
                        };
                    }
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'price'){
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
                    fetch('/api/technic/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/technic/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                },
            }
        ],
        selected: []
    };

    componentDidMount() {
        fetch('/api/type_t/text').then(res => res.json())
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
            fetch('/api/technic/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .then(del =>  window.location.assign('http://localhost:3000/technic'));

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
                    <h1 className="list_h1">Список техники</h1>
                    <div>
                        <div className="buttons">
                            <Link to='/add-technic'><Button variant="success">Добавить</Button></Link>
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
                                        // beforeSaveCell,
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

export default Technic;