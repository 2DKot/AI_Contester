/// <reference path="../../typings/tsd.d.ts" />
"use strict";

import {connection} from './mongoose_connection';
import {Schema, Document} from 'mongoose';

var OAuthAccessTokensSchema: Schema = new Schema({
    accessToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

var OAuthRefreshTokensSchema: Schema = new Schema({
    refreshToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

var OAuthClientsSchema: Schema = new Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUri: { type: String }
});

var OAuthUsersSchema: Schema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String, default: '' }
});

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
}

export var AccessTokenModel = connection.model('OAuthAccessTokens', OAuthAccessTokensSchema);
export var RefreshTokenModel = connection.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
export var ClientModel = connection.model('OAuthClients', OAuthClientsSchema);
export var UserModel = connection.model<IUser>('Users', OAuthUsersSchema);
