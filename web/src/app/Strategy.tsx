/// <reference path="../../typings/tsd.d.ts"/>

"use strict";
import * as React from 'react';
import {IStrategy} from './IStrategy';

interface IStrategyProps {
    strategy: IStrategy;
}

interface IStrategyState {
}

export class Strategy extends React.Component<IStrategyProps, IStrategyState> {
    constructor(props: IStrategyProps) {
        super(props);
        this.state = {};
    }
        
    render() {
        return (
            <div style={{ border: "solid" }}>
                { this.props.strategy.userId }
                { this.props.strategy.status }
            </div>
        );
    }
}
