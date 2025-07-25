/**
 * Node modules
 */
import { Schema, model, Types } from 'mongoose';

interface ILike {
  blogId?: Types.ObjectId;
  userId?: Types.ObjectId;
  commentId?: Types.ObjectId;
}

const likeSchema = new Schema<ILike>({
  blogId: {
    type: Schema.Types.ObjectId,
  },
  commentId: {
    type: Schema.Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Like = model<ILike>('Like', likeSchema);

export default Like;
