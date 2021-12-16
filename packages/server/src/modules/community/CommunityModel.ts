import mongoose, { Schema, Types } from 'mongoose';

export interface Community {
  name: string;
  displayName: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  mods: Types.ObjectId[];
}

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

export const CommunityModel = mongoose.model('Community', CommunitySchema);
