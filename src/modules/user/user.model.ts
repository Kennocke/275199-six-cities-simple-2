import mongoose from 'mongoose';
import {User} from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';

export interface UserDocument extends User, mongoose.Document {
    createdAt: Date,
    updateAt: Date
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
        required: true,
    },
    avatar: {
        type: String,
        require: true,
        minlength: [5, 'Min length for avatar path is 5'],
    },
    name: {
        type: String,
        required: true,
        minlength: [2, 'Min length for firstname is 2']
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: UserType
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);