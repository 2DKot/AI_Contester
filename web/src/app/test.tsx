/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';
var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

export interface IHelloProps {
}

export interface IHelloState {
    name: string;
    message: string;
}

export class Hello extends React.Component<IHelloProps, IHelloState> {
    constructor(props: IHelloProps) {
        super(props);
        this.state = { name: "", message: "" };
    }

    handleSubmit() {
        fetch(endpoint + "hello/" + this.state.name)
            .then(response => response.json())
            .then(json => {
                this.setState({ name: this.state.name, message: json.message });
            })
            .catch(ex => {
                console.log('parsing failed', ex);
            });
            
    }

    handleChange(e) {
        this.setState({ name: e.target.value, message: this.state.message });
    }

    render() {
        return (
            <div style = {{border: "solid"}}>
                <h3>Тест обычного запроса</h3>
                name:<input onChange={e => this.handleChange(e) }/>
                <button onClick = {e => this.handleSubmit()}>Hello!</button><br/>
                {this.state.message}
            </div>
        );
    }
}

export interface ISecretProps {
    token: string;
}

export interface ISecretState {
    message: string;
}

export class Secret extends React.Component<ISecretProps, ISecretState> {
    constructor(props: ISecretProps) {
        super(props);
        this.state = {message: ""};
    }

    handleSubmit() {
        fetch(endpoint + 'secret/', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ message: json.message });
            })
            .catch(ex => {
                console.log('parsing failed', ex);
            });
            
    }

    render() {
        return (
            <div>
                <button onClick = {e => this.handleSubmit()}>Secret...</button><br/>
                {this.state.message}
            </div>
        );
    }
}