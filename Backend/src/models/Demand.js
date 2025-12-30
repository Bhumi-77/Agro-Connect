import mongoose from 'mongoose';

const demandSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ['kg','quintal','crate','bag','liter','unit'], default: 'kg' },
  targetPrice: Number,
  location: {
    district: String,
    province: String
  },
  note: String,
  status: { type: String, enum: ['open','fulfilled','closed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model('Demand', demandSchema);
