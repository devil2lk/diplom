import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import './Eq_repair.css'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import {Button} from "react-bootstrap";
function priceFormatter(cell, row) {
    return (
        <span>{ cell } Руб.</span>
    );
}
const today = new Date();
class Eq_repair extends Component{
    constructor(props) {
        super(props);
        this.state= {
            fio_master: localStorage.getItem('fio'),
            id_new_orders: localStorage.getItem('id_new_orders'),
            fio_client: '',
            products: [],
            columns: [{
                dataField: '_id',
                isKey: true,
                hidden: true
            }, {
                dataField: 'type_t',
                text: 'Вид техники',
            }, {
                dataField: 'name_service',
                text: 'Наименование услуги',

            },{
                dataField: 'name',
                text: 'Наименование техники',

            },{
                dataField: 'price',
                text: 'Цена',
            }],
        }
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("document_out.pdf");
                localStorage.removeItem('id_new_orders');
                localStorage.removeItem('type_t');
                localStorage.removeItem('name');
                localStorage.removeItem('name_service');
                localStorage.removeItem('fio_client');
                localStorage.removeItem('price');

                window.location.assign('http://localhost:3000/orders/');
            })
        ;
    }

    handleRedirect() {
        localStorage.removeItem('id_new_orders');
        localStorage.removeItem('type_t');
        localStorage.removeItem('name');
        localStorage.removeItem('name_service');
        localStorage.removeItem('fio_client');
        localStorage.removeItem('price');
        window.location.assign('http://localhost:3000/orders/');
    }
    componentDidMount() {
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/invoice', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({products: data}))
            .then(data => this.setState({fio_client: this.state.products[0].fio_client}))
    };

    render() {
        return (
            <div>
                <div className="mb5">
                    <Button onClick={this.printDocument} variant="success">Сохранить</Button>
                    <Button onClick={this.handleRedirect} className='btn_close' variant="dark">Закрыть</Button>
                </div>
                <div id="divToPrint" className="mt4">
                    <div>
                        <div className="invoice-box">
                            <table cellPadding="0" cellSpacing="0">
                                <tr className="top">
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    Дата: {`${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}.`}
                                                </td>
                                                <td>
                                                    Компания: ООО «ПочиниКА»
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr className="information">
                                    <td colSpan="2">
                                        <table>
                                            <tr>

                                                <td>
                                                    Исполнитель: {this.state.fio_master}
                                                </td>
                                                <td>
                                                    Номер: {this.state.id_new_orders}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Заказчик: {this.state.fio_client}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <ToolkitProvider
                            keyField={'_id'}
                            data={ this.state.products }
                            columns={ this.state.columns }
                        >
                            {
                                props => (
                                    <div>
                                        <BootstrapTable
                                            keyField={'_id'}
                                            data={ this.state.products }
                                            columns={ this.state.columns }
                                            tabIndexCell
                                            bordered={ false }

                                            { ...props.baseProps }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Eq_repair;