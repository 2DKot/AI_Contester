/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

export interface ISignupProps {
    
}

export interface ISignupState {
    username?: string,
    password?: string,
    passwordDuplicate?: string,
    email?: string,
    duplicatePasswordMessage?: string,
    statusMessage?: string
}

export class Signup extends React.Component<ISignupProps, ISignupState> {
    constructor(props: ISignupProps) {
        super(props);
        this.state = {};
    }
    handleName(e) {
        this.setState({ username: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value }, this.matchPasswords);
    }
    handlePasswordDuplicate(e) {
        this.setState({ passwordDuplicate: e.target.value }, this.matchPasswords);
    }
    matchPasswords() {
        if(this.state.password !== this.state.passwordDuplicate) {
            this.setState({duplicatePasswordMessage: "Passwords doesn't match!"});
        }
        else {
            this.setState({duplicatePasswordMessage: "OK!"});
        }
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleSubmit(){
        if(this.state.password != this.state.passwordDuplicate) {
            return;
        }
        fetch(endpoint + "users", {
            method: 'post',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ statusMessage: data.message });
            });
    }
    render() {
        return (
            <div style={{border:"solid"}}>
                <h3>Регистрация</h3>
                <input 
                    type="text"
                    placeholder = "ваш логин"
                    value={this.state.username}
                    onChange={e=>this.handleName(e)}
                /><br/>
                <input
                    type="text"
                    placeholder = "пароль"
                    value={this.state.password}
                    onChange={e=>this.handlePassword(e)}
                /><br/>
                <input 
                    type="text"
                    placeholder="подтверждение пароля"
                    value={this.state.passwordDuplicate}
                    onChange={e=>this.handlePasswordDuplicate(e)}
                /> {this.state.duplicatePasswordMessage}<br/>
                <input
                    type="text"
                    placeholder="your@mail.com"
                    value={this.state.email}
                    onChange={e=>this.handleEmail(e)}
                /><br/>
                <button onClick={e=>this.handleSubmit()}>Signup</button><br/>
                {this.state.statusMessage}
            </div>
        );
    }
}