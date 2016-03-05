"use strict";

import mongoose = require('mongoose');

var conn: mongoose.Connection = require('./mongoose_connection');

import Schema = mongoose.Schema;

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

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
}

export var AccessTokenModel = conn.model('OAuthAccessTokens', OAuthAccessTokensSchema);
export var RefreshTokenModel = conn.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
export var ClientModel = conn.model('OAuthClients', OAuthClientsSchema);
export var UserModel = conn.model<IUser>('Users', OAuthUsersSchema);
