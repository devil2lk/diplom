import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Technic from "../Technic/Technic";
import Type_technic from "../Type_technic/Type_technic";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";
import Add_technic from "../Add_technic/Add_technic";
import Add_type_technic from "../Add_type_technic/Add_type_technic";
import Client from "../Client/Client";
import Add_client from "../Add_client/Add_client";
import Master from "../Master/Master";
import Add_master from "../Add_master/Add_master";



function Main() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/technic' component={Technic}/>
                    <Route path='/add_technic' component={Add_technic}/>
                    <Route path='/type_technic' component={Type_technic}/>
                    <Route path='/add_type_technic' component={Add_type_technic}/>
                    <Route path='/client' component={Client}/>
                    <Route path='/add_client' component={Add_client}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/master' component={Master}/>
                    <Route path='/add_master' component={Add_master}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/register' component={Register}/>


                </Switch>
            </main>
        );
}

export default Main;