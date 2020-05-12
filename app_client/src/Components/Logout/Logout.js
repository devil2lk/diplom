import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverOtvet: ''
        }
    }

    delete_cookie (cookie_name) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    handleSubmitLogout = (e) => {
        e.preventDefault();

        fetch('/api/signout', {
            method: 'get'
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
        console.log(this.state.serverOtvet)
    };

    render() {
        if (this.state.serverOtvet.success) {
            this.delete_cookie('Authorized');
            window.location.assign('http://localhost:3000/');
        } else {
            return (
                <form className="form-horizontal" onSubmit={this.handleSubmitLogout}>
                    <div className='text-center'>
                        <h1>Вы действительно хотите выйти?</h1>
                        <div className='row'>
                            <div className='col-lg-5'>
                                <button type="button " className="flex-column btn btn-primary text-white btn-lg btn-block text-center btn-danger" onSubmit={this.handleSubmitLogout}>Да, выйти</button>
                            </div>
                            <div className='col-lg-5'>
                                <Link  to='/List'><button type="button " className="flex-column btn btn-primary text-white btn-lg btn-block text-center btn-danger">Нет</button></Link>
                            </div>
                        </div>
                    </div>
                </form>
            )
        }
    }
}

export default Logout;