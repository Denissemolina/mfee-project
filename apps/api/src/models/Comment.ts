import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
}

const commentSchema: Schema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: true
    },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;