import { model, Schema } from "mongoose";
import { IUserSchema, IUser, IUserModel } from './user.interface';

import { hash } from 'bcrypt'

const UserSchema = new Schema<IUserSchema>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

UserSchema.virtual("full_name").get(function(this: IUserSchema) {
    return this.first_name + this.last_name
})

UserSchema.pre('save', async function(this: IUserSchema, next){
    if(this.isModified('password')) {
        this.password = await hash(this.password, 10)
    }
})


export const UserModel: IUserModel = model<IUser, IUserModel>('User', UserSchema);