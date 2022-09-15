import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './UserSchema';
export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  expiredAt: number;
}

const TokenSchema: any = new Schema(
  {
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    expiredAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model<IToken>('Token', TokenSchema);
