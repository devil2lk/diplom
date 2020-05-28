import React, {Component} from "react";
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const regExpName =/(^[А-ЯA-Z]{1} [а-яa-z]{1,}$)|(^[А-ЯA-Z]{1} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [а-яa-z]{1,}$)/;
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

class Price_list extends Component{


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
            dataField: 'name_service',
            text: 'Наименование услуги',
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
                    if (prop === 'name_service'){
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
                fetch('/api/price_list/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/price-list/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },

        },{
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
                fetch('/api/price_list/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/price-list/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        }],
        selected: []
    };

    componentDidMount() {
        fetch('/api/price_list/text').then(res => res.json())
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
            fetch('/api/price_list/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .then(del =>  window.location.assign('http://localhost:3000/price-list'));

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


        console.log(this.state.products);
        if (get_cookie('Authorized') === null){
            return (
                <div>
                    <h1 className="list_h1">Прайс-лист</h1>
                    <div>
                        <div className="table">
                            <BootstrapTable
                                onDataSizeChange={ this.handleDataChange }
                                keyField={'_id'}
                                data={ this.state.products }
                                columns={ this.state.columns }
                                hover
                                noDataIndication="Нет записей"
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="list_h1">Прайс-лист</h1>
                    <div>
                        <div className="buttons">
                            <Link to='/add-price'><Button variant="success">Добавить</Button></Link>
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

export default Price_list;