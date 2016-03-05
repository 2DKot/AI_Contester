/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

function base64encode(str) {
    //from http://www.manhunter.ru/webmaster/423_funkcii_base64_na_javascript.html
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg'+
                   'hijklmnopqrstuvwxyz0123456789+/=';
    var b64encoded = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
 
    for (var i=0; i<str.length;) {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);
 
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
 
        enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
        enc4 = isNaN(chr3) ? 64:(chr3 & 63);
 
        b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
                      b64chars.charAt(enc3) + b64chars.charAt(enc4);
    }
    return b64encoded;
}

export interface ILoginProps {
    onLogin(accessToken: string):void;
}

export interface ILoginState {
    username?: string,
    password?: string
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = { username:"", password: "" };
    }
    handleName(e){
        this.setState({ username: e.target.value });
    }
    handlePassword(e){
        this.setState({ password: e.target.value });
    }
    authorize() {
        var checkStatus = function(response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300 && response.ok) {
                return response;
            } else {
                return response;
                //throw new Error(response.statusText);
            }
        }
        var parseJSON = function(response) {
            return response.json()
        }
        var authString = 'Basic ' + base64encode('superID:superSecret');
        var bodyString = 'grant_type=password&username='+this.state.username+'&password='+this.state.password;
        fetch(endpoint + 'oauth/token/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': authString
            },
            body: bodyString
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                console.log(data);
                this.props.onLogin(data.access_token);
            })
            .catch(ex => {
                console.log('request failed: ', ex);
            });
    }
    render() {
        return (
            <div style = {{border: "solid"}}>
                <h3>Вход</h3>
                username:<input onChange={e => this.handleName(e)}/>
                password:<input onChange={e => this.handlePassword(e)}/>
                <button onClick={e=>this.authorize()}>login</button>
            </div>
        );
    }
}