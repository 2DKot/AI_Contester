/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';
import {IStrategy} from './IStrategy'
import {UserMini} from './UserMini';

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

    componentDidMount(){
        this.refresh();
    }
    
    refresh() {
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
    
    // POST doesn't save type of date and JS think, that it's string!
    // TODO: Need to solve this later!
    formatDate(rawDate: any) {
        var d = new Date(rawDate);
        return d.getHours() + ":" + d.getMinutes() + " "
            + d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
    }
    
    render() {
        var strategies = this.state.strategies.map(((strategy) =>
            <tr key = {strategy._id}>
                <td>{this.formatDate(strategy.date)}</td>
                <td><UserMini userId={strategy.userId}/></td>
                <td>{strategy.status}</td>
                <td>{strategy.status === "error" ?
                    <details><textarea
                        readOnly
                        wrap = "off"
                        cols = {70}
                        rows = {4}
                        value = {strategy.errorMessage}
                        /></details> :
                    strategy.status == "compiling" ?
                        "---" :
                        "Без ошибок"}
                </td>
                <td>
                    <a
                        href = {"data:text/plain;charset=utf-8," + encodeURIComponent(strategy.source) }
                        target = "_blank"
                        download = "MyStategy.java"
                        >
                        Скачать
                    </a>
                </td>
            </tr>
        ));
        return (
            <div style={{ border: "solid" }}>
                <h3>Список стратегий ({this.state.strategies.length}) </h3>
                <button
                    onClick = {() => this.refresh() }
                    > Обновить </button>
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Пользователь</th>
                            <th>Статус</th>
                            <th>Текст ошибки</th>
                            <th>Исходный код</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strategies}
                    </tbody>
                </table>
            </div>
        );
    }
}
