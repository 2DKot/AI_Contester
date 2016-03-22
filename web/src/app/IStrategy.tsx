import {IUser} from './IUser';

export interface IStrategy {
    sender: IUser;
    status: string;
    source: string;
    errorMessage?: string;
    class?: Buffer;
}
