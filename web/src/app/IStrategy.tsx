import {IUser} from './IUser';

export interface IStrategy {
    userId: string;
    status: string;
    source: string;
    errorMessage?: string;
    class?: Buffer;
    _id: string;
    date: Date;
}
