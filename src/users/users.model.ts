import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from './users.interface'

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'The name is mandatory and unique']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is mandatory and unique'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshTokens: [String],
},{
        timestamps: { createdAt: true, updatedAt: true }
})

UserSchema.methods.savePassword = async function savePassword(): Promise<boolean> {
    const user = this as any;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return true;
};

UserSchema.methods.validatePassword = function validatePassword(
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, (this as any).password);
  };

export default model<IUser>('User', UserSchema)