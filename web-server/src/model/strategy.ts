"use strict";

import {connection} from "./mongoose_connection";
import {Schema, Document} from 'mongoose';


var StrategySchema: Schema = new Schema({
    userId: { type: String },
    source: { type: String },
});

export interface IStrategy extends Document {
    userId: string;
    source: string;
}

export var StrategyModel = connection.model<IStrategy>('Users', StrategySchema);
