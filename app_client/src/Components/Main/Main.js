import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Add from "../Add/Add";
import Technic from "../Technic/Technic";
import Type_technic from "../Type_technic/Type_technic";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";
import Add_technic from "../Add_technic/Add_technic";
import Add_type_technic from "../Add_type_technic/Add_type_technic";



function Main() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/Technic' component={Technic}/>
                    <Route path='/Add_technic' component={Add_technic}/>
                    <Route path='/Type_technic' component={Type_technic}/>
                    <Route path='/Add_type_technic' component={Add_type_technic}/>
                    <Route path='/Login' component={Login}/>
                    <Route path='/Logout' component={Logout}/>
                    <Route path='/Register' component={Register}/>
                </Switch>
            </main>
        );
}

export default Main;