/// <reference path="../../typings/react/react.d.ts"/>
/// <reference path="../../typings/react/react-dom.d.ts"/>
/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

export interface ISendStrategyProps {
    token: string;
}

export interface ISendStrategyState {
    strategyCode?: string;
    statusMessage?: string;
}

export class SendStrategy extends React.Component<ISendStrategyProps, ISendStrategyState> {
    constructor(props: ISendStrategyProps) {
        super(props);
        this.state = {};
    }

    handleStrategyCode(e) {
        this.setState({ strategyCode: e.target.value });
    }
    
    handleFile(e) {
        var file: File = e.target.files[0];
        if(file.size > 100000) {
            this.setState({statusMessage: "Слишком большой файл!"});
            return;
        }
        console.log(file.type)
        var reader = new FileReader();
        reader.onloadend = (e) => {
            var code = reader.result;
            this.setState({strategyCode: code});
        };
        reader.readAsText(file);      
    }
    
    handleSubmit() {
        function codeToMessage(code: number) {
            switch (code) {
                case 200: return "Отправлено на компиляцию.";
                case 400: return "Ошибочный запрос. Ошибка кода страницы.";
                case 500: return "Внутренняя ошибка сервера.";
                default: return "Неожиданный ответ сервера.";
            }
        }
        fetch(endpoint + "strategies", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                source: this.state.strategyCode,
            })
        })
            .then(response => {
                this.setState({ statusMessage: codeToMessage(response.status) });
                return response.json()
            })
            .then(data => {
                console.log(data.message);
            });
    }
    render() {
        return (
            <div style={{ border: "solid" }}>
                <h3>Отправка стратегии</h3>
                <textarea
                    placeholder = "Copy your code here, or load file by button below."
                    value={this.state.strategyCode}                 
                    onChange={e=> this.handleStrategyCode(e) }
                /><br/>
                <input
                    type = "file"               
                    onChange={e=> this.handleFile(e) }
                /><br/>
                <button onClick={e=> this.handleSubmit() }>Send</button><br/>
                {this.state.statusMessage}
                </div>
        );
    }
}