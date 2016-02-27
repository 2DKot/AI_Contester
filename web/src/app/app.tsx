/// <reference path="../../typings/react/react.d.ts"/>
"use strict";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Hello, Secret} from './test';
import {Login} from './login'

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
    
    render() {
        return (
            <div>
                <Hello/>
                {this.state.accessToken ? 
                    <Secret token = {this.state.accessToken}/> :
                    <Login onLogin={token => this.handleLogin(token)}/>}
                Access token: {this.state.accessToken}
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('app'));
