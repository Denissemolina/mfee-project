import mongoose, { Schema, Document, Types } from 'mongoose';

interface IPost extends Document {
    title: string;
    image: string;
    description: string;
    category: Types.ObjectId; 
    comments: Types.ObjectId[]; 
  }

const postSchema: Schema = new Schema<IPost>({
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
          required: true
        }
      ]
}, { 
    timestamps: true 
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;