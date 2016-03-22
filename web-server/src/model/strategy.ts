/// <reference path="../../typings/tsd.d.ts" />
"use strict";

import {connection} from "./mongoose_connection";
import {Schema, Document} from 'mongoose';


var StrategySchema: Schema = new Schema({
    userId: { type: String },
    source: { type: String },
    status: { type: String },
    class: { type: Buffer },
    errorMessage: { type: String }
});

export interface IStrategy extends Document {
    userId: string;
    source: string;
    status: string;
    class?: Buffer;
    errorMessage?: string;
}

export var StrategyModel = connection.model<IStrategy>('Strategies', StrategySchema);
