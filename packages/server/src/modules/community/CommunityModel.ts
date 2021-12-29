import mongoose, { Schema, Types, Document } from 'mongoose';

export interface Community {
  name: string;
  displayName: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  mods: Types.ObjectId[];
}

// TODO: Is there a way to do it better?
export interface CommunityDocument extends Community, Document {}

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 21,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    mods: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
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

export const CommunityModel = mongoose.model<CommunityDocument>(
  'Community',
  CommunitySchema,
);
