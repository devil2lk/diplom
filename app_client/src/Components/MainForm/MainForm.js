import React, {Component} from "react";
import Add from "../Add/Add";
import Main from "../Main/Main";

class MainForm extends Component{
    render() {
        return (
            <div>
                <h1 className='text-center'>Добавление новой записи</h1>
            <Add/>
            <Main/>
            </div>
        );
    }
}

export default MainForm;