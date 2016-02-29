/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts"/>
/// <reference path="../../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../../typings/oauth2-server/oauth2-server.d.ts"/>

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

module.exports.AccessTokens = conn.model('OAuthAccessTokens', OAuthAccessTokensSchema);
module.exports.RefreshTokens = conn.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
module.exports.Clients = conn.model('OAuthClients', OAuthClientsSchema);
module.exports.Users = conn.model('Users', OAuthUsersSchema);

export = module.exports;