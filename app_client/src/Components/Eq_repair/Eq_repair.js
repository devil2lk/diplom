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
            id_new_technic: localStorage.getItem('id_new_technic'),
            products: [],
            columns: [{
                dataField: '_id',
                isKey: true,
                hidden: true
            }, {
                dataField: 'type_t',
                text: 'Вид техники',
            }, {
                dataField: 'name',
                text: 'Наименование ',

            },{
                dataField: 'maker',
                text: 'Производитель',
            },{
                dataField: 'date_make',
                text: 'Дата производства',
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
                pdf.save("накладная.pdf");
                localStorage.removeItem('id_new_technic');
                window.location.assign('http://localhost:3000/technic/');
            })
        ;
    }

    handleRedirect() {
        window.location.assign('http://localhost:3000/technic/');
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
            .then(data => this.setState({products: data}));
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
                                                    Номер: {this.state.id_new_technic}
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