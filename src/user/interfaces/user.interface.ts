import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    roles: string[];
    active: boolean;
}