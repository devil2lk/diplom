import React, {Component} from "react";
import './Orders.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

// const regExpFIO = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
// const regExpYsl = /^([a-zа-яё]+)$/i;
// const regExpPrice = /^\d+$/;
let formBody = [];

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Orders extends Component{


    state = {
        serverOtvet: '',
        products: [],
        textsend: '',
        emailsend: '',
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
            editable: false

        },{
            dataField: 'name',
            text: 'Наименование техники',
            selected: false,
            editable: false
        },{
            dataField: 'fio_client',
            text: 'ФИО клиента',
            selected: false,
            editable: false
        },{
            dataField: 'fio',
            text: 'ФИО мастера',
            selected: false,
            editable: false
        },{
            dataField: 'price',
            text: 'Цена',
            selected: false,
            editable: false
        },{
            dataField: 'status',
            text: 'Статус',
            selected: false,
            editable: true,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'Принято',
                    label: 'Принято'
                },{
                    value: 'В работе',
                    label: 'В работе'
                },{
                    value: 'Ожидает оплаты',
                    label: 'Ожидает оплаты'
                },{
                    value: 'Завершено',
                    label: 'Завершено'
                },
                ]
            },
            validator: (newValue, row, column) => {

                formBody = [];
                for (let prop in row) {
                    if (prop === 'status'){
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
                fetch('/api/orders/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db => {
                        if (newValue === 'Завершено'){
                            //записать в локал
                            console.log(this.state.serverOtvet);
                            localStorage.setItem('type_t', this.state.serverOtvet.type_t);
                            localStorage.setItem('name', this.state.serverOtvet.name);
                            localStorage.setItem('name_service', this.state.serverOtvet.name_service);
                            localStorage.setItem('fio_client', this.state.serverOtvet.fio_client);
                            localStorage.setItem('price', this.state.serverOtvet.price);
                            localStorage.setItem('id_new_orders', this.state.serverOtvet.id_new_orders);
                            window.location.assign('http://localhost:3000/invoice/');
                        } else {
                            window.location.assign('http://localhost:3000/orders/');
                        }
                    })
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        }
        ],
        selected: []
    };

    componentDidMount() {
        fetch('/api/orders').then(res => res.json())
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
            fetch('/api/orders/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .then(del =>  window.location.assign('http://localhost:3000/orders'));

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
                    <h1 className="list_h1">Список заказов</h1>
                    <div>
                        <div className="buttons">
                            <Link to='/add-orders'><Button variant="success">Добавить</Button></Link>
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

export default Orders;