import mongoose from 'mongoose';

const offreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
});

const offres = mongoose.model('offres', offreSchema);
export default offres;
