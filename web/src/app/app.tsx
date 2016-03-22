/// <reference path="../../typings/react/react.d.ts"/>
"use strict";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Hello, Secret} from './test';
import {Login} from './login'
import {Signup} from './signup'
import {SendStrategy} from './sendStrategy'
import {StrategiesList} from './StrategiesList'

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

interface IAppProps {
}

interface IAppState {
    accessToken?: string
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        if (token) {
            fetch(endpoint + 'secret/', {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ accessToken: token });
                    }
                    else if (res.status == 401) {
                        localStorage.removeItem("token");
                        return;
                    }
                    else {
                        console.log("Unexpected code: " + res.status);
                    }
                })
                .catch(ex => {
                    console.log('parsing failed', ex);
                });

        }
    }
    
    handleLogin(accessToken: string){
        this.setState({accessToken: accessToken});
        localStorage.setItem("token", accessToken);
    }
    
    logout(){
        this.setState({ accessToken: "" });
        localStorage.removeItem("token");
    }
    
    render() {
        return (
            <div>
                <Hello/>
                
                {this.state.accessToken ?
                    <div>
                        <Secret token = {this.state.accessToken}/>
                        <SendStrategy token = {this.state.accessToken}/>
                        <StrategiesList token = {this.state.accessToken}/>
                    </div>:
                    <div>
                        <Signup/>
                        <Login onLogin={token => this.handleLogin(token)}/>
                    </div>
                }
                {this.state.accessToken ?
                    <button onClick={e => this.logout()}>Выйти</button>:
                    null
                }
                Access token: {this.state.accessToken}
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('app'));
