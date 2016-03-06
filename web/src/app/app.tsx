/// <reference path="../../typings/react/react.d.ts"/>
"use strict";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Hello, Secret} from './test';
import {Login} from './login'
import {Signup} from './signup'
import {SendStrategy} from './sendStrategy'

interface IAppProps {
}

interface IAppState {
    accessToken: string
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = { accessToken: "" };
    }
    
    handleLogin(accessToken: string){
        this.setState({accessToken: accessToken});
    }
    
    logout(){
        this.setState({accessToken: ""});
    }
    
    render() {
        return (
            <div>
                <Hello/>
                
                {this.state.accessToken ?
                    <div>
                        <Secret token = {this.state.accessToken}/>
                        <SendStrategy token = {this.state.accessToken}/>
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
