import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
});

const blogs = mongoose.model('Blogs', blogSchema);
export default blogs;
