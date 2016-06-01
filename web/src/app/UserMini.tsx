/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./config.d.ts"/>

"use strict";
import * as React from 'react';
import {IUser} from './IUser';

var endpoint = "http://" + config.backend.ip + ":" + config.backend.port + "/";

interface IUserMiniProps {
    userId: string;
}

interface IUserMiniState {
    user?: IUser;
    loaded?: boolean;
}

export class UserMini extends React.Component<IUserMiniProps, IUserMiniState> {
    constructor(props: IUserMiniProps) {
        super(props);
        this.state = { loaded: false };
    }
        
    componentDidMount() {
        fetch(endpoint + "users/" + this.props.userId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                this.setState({ user: data.user, loaded: true });
            });
    }
   
    render() {
        if(!this.state.loaded)
        {
            return <div>Load user..</div>
        }
        
        if(!this.state.user)
        {
            return <div>Unknown user</div>;
        }
        
        return (
            <div>
                {  this.state.user.username }
            </div>
        );
    }
}