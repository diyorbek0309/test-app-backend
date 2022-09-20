import mongoose, { Schema } from 'mongoose';
import { IToken } from '../types/iSchemas';

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
