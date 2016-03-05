"use strict";

import mongoose = require('mongoose');

import {connection} from "./mongoose_connection";
import Schema = mongoose.Schema;


var StrategySchema: Schema = new Schema({
    userId: { type: String },
    source: { type: String },
});

export interface IStrategy extends mongoose.Document {
    userId: string;
    source: string;
}

export var Strategy = connection.model<IStrategy>('Users', StrategySchema);
