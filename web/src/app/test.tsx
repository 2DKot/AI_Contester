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
        this.state = { name: "NONAME", message: "" };
    }

    handleSubmit() {
        fetch('http://127.0.0.1:3000/hello')
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
                <input onChange={e => this.handleChange(e) }/>
                <button onClick = {e => this.handleSubmit()}>GO</button>
                {this.state.message}
            </div>
        );
    }
}

