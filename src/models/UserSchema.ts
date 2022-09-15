import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model<IUser>('User', UserSchema);
