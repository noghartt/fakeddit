import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';

// TODO There's a way to remove methods from this interface?
interface User {
  username: string;
  displayName: string;
  email: string;
  password: string;
  hashPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => string;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
      minlength: 3,
      maxlength: 25,
    },
    displayName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: function (email: string) {
        return yup.string().email().validate(email);
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

UserSchema.pre('save', async function encryptPassword(next) {
  if (!this.isModified('password') || !this.isNew) return next();

  try {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;

    return next();
  } catch (err: any) {
    // TODO Change the type of this `err` from catch
    throw new Error(err);
  }
});

UserSchema.methods = {
  hashPassword: async function (password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      return hash;
    } catch (err: any) {
      // TODO Change the type of this `err` from catch
      throw new Error(err);
    }
  },
};

export const UserModel = model('User', UserSchema);
