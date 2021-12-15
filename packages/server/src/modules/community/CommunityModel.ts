import mongoose, { Schema, Types } from 'mongoose';

export interface Community {
  name: string;
  displayName: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  mods: Types.ObjectId[];
}

const CommunitySchema = new Schema<Community>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 21,
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    mods: [Schema.Types.ObjectId],
    members: [Schema.Types.ObjectId],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const CommunityModel = mongoose.model('Community', CommunitySchema);
