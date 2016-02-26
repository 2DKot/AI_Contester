/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts"/>

"use strict";
import * as React from 'react';


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
        fetch('http://127.0.0.1:3000/hello/' + this.state.name)
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
            <div>
                name:<input onChange={e => this.handleChange(e) }/>
                <button onClick = {e => this.handleSubmit()}>Hello!</button><br/>
                {this.state.message}
            </div>
        );
    }
}

export interface INumProps {
}

export interface INumState {
    num: number;
}

export class Num extends React.Component<INumProps, INumState> {
    constructor(props: INumProps) {
        super(props);
        this.state = { num: undefined };
        this.get();
    }

    get() {
        fetch('http://127.0.0.1:3000/number/')
            .then(response => response.json())
            .then(json => {
                this.setState({ num: json.number });
            })
            .catch(ex => {
                console.log('parsing failed', ex);
            });
    }
    
    setNewNumber(x: number) {
        fetch('http://127.0.0.1:3000/number/', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newNumber: x
            })})
            .then(response => response.json())
            .then(json => {
                if(json.status == "ok") {
                    this.get();
                }
            })
            .catch(ex => {
                console.log('parsing failed', ex);
            });
    }
    
    resetNumber() {
        fetch('http://127.0.0.1:3000/number/', { method: 'post'})
            .then(response => response.json())
            .then(json => {
                if(json.status == "ok") {
                    this.get();
                }
            })
            .catch(ex => {
                console.log('parsing failed', ex);
            });
    }

    render() {
        return (
            <div>
                <button onClick = {e => this.setNewNumber(this.state.num + 1)}>+</button>
                <button onClick = {e => this.setNewNumber(this.state.num - 1)}>-</button>
                <button onClick = {e => this.resetNumber()}>=</button>
                <button onClick = {e => this.get()}>получить x</button><br/>
                x = {this.state.num}
            </div>
        );
    }
}