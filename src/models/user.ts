/**
 * Node modules
 */
import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    x?: string;
    github?: string;
  };
}

/**
 * User schema
 */
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username must be less than 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [50, 'Enter a valid email'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'password is requied'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'First name must be less than 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name must be less than 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxLength: [100, 'Website address must be valid'],
      },
      instagram: {
        type: String,
        maxLength: [100, 'instagram address must be valid'],
      },
      github: {
        type: String,
        maxLength: [100, 'github address must be valid'],
      },
      x: {
        type: String,
        maxLength: [100, 'x address must be valid'],
      },
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
