import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  username: string;
  displayName?: string;
  email: string;
  password: string;
  communities: Types.ObjectId[];
}

export interface UserDocument extends User, Document {
  hashPassword(password: string): Promise<string>;
}

// TODO: For some reason, I can't pass User interface to generic Schema type
// we should verify why and fix it
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 12,
    },
    displayName: {
      type: String,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    communities: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Community',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }

  return next();
});

UserSchema.methods = {
  hashPassword: async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },
};

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
