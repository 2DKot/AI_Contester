/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';
import {IStrategy} from './IStrategy'
import {Strategy} from './Strategy'

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

interface IStrategiesListProps {
    token: string;
}

interface IStrategiesListState {
    strategies?: IStrategy[];
}

export class StrategiesList extends React.Component<IStrategiesListProps, IStrategiesListState> {
    constructor(props: IStrategiesListProps) {
        super(props);
        this.state = { strategies: [] };
    }
    
    handleRefresh() {
        fetch(endpoint + "strategies", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                this.setState({ strategies: data.strategies });
            });
    }
    
    render() {
        var strategies = this.state.strategies.map(((strategy, index) => 
            <li key={index}><Strategy strategy={strategy}/></li>
        ));
        console.log(strategies);
        return (
            <div style={{ border: "solid" }}>
                <h3>Список стратегий ({this.state.strategies.length})</h3>
                <button 
                    onClick = {() => this.handleRefresh()}
                > Обновить </button>
                <ul>{strategies}</ul>
            </div>
        );
    }
}
