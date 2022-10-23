import {User} from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { UserType } from '../../types/user-type.enum.js';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'users'
    }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
    constructor(data: User) {
        super();

        this.email = data.email;
        this.avatar = data.avatar;
        this.name = data.name;
        this.type = data.type;
    }

    @prop({required: true, default: ''})
    public name!: string;
    @prop({unique: true, required: true})
    public email!: string;
    @prop({required: true, default: ''})
    public avatar!: string;
    @prop({required: true, default: UserType.Common})
    public type!: string;
    @prop({required: true, default: ''})
    private password!: string;

    public setPassword(password: string, salt: string) {
        this.password = createSHA256(password, salt);
    }

    public getPassword() {
        return this.password;
    }
}

export const UserModel = getModelForClass(UserEntity);