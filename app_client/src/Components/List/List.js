import React, {Component} from "react";
import './List.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const regExpFIO = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
const regExpYsl = /^([a-zа-яё]+)$/i;
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

class List extends Component{


    state = {
        serverOtvet: '',
        products: [],
        columns: [{
            dataField: '_id',
            isKey: true,
            text: 'ID услуги',
            selected: false
        }, {
            dataField: 'name',
            text: 'Наименование',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpYsl.test(newValue)) {
                    return {
                        valid: false,
                        message: 'Услуга вводится без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
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
                formBody = formBody.join("&");
                fetch('/api/comp/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/List/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        }, {
            dataField: 'name_master',
            text: 'ФИО мастера',
            selected: false,
            validator: (newValue, row, column) => {
                if (!regExpFIO.test(newValue)) {
                    return {
                        valid: false,
                        message: 'ФИО вводится через пробел без цифр'
                    };
                }
                formBody = [];
                for (let prop in row) {
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
                formBody = formBody.join("&");
                fetch('/api/comp/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/List/'))
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
                        message: 'Цена должна быть числовой'
                    };
                }
                if (newValue < 100) {
                    return {
                        valid: false,
                        message: 'Цена должна быть больше 100'
                    };
                }
                formBody = [];
                for (let prop in row) {
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
                formBody = formBody.join("&");
                fetch('/api/comp/upgrade', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:formBody
                }).then(res => res.json())
                    .then(data => this.setState({serverOtvet: data}))
                    .then(db =>  window.location.assign('http://localhost:3000/List/'))
                    .catch(err => console.log("err: =" + err));
                return true;
            },
        }],
        selected: []
    };

    componentDidMount() {
        fetch('/api/comp').then(res => res.json())
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
            fetch('/api/comp/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => console.log("err: =" + err))
                .then(del =>  window.location.assign('http://localhost:3000/List'));

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
            window.location.assign('http://localhost:3000/Login');
        } else {
            return (
                <div>
                    <h1 className="list_h1">Список услуг</h1>
                    <div>
                        <button className="btn delete-button" onClick={ this.handleGetSelectedData }>Удалить</button>
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

export default List;