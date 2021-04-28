import * as mongoose from 'mongoose';

export const UserShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // default:'banana'
    },
    roles: [{
        type: String,
        required: true,
        enum: [ 'user', 'admin'],
        default: 'user',
    }],
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});
