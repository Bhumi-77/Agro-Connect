import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  amount: Number,
  method: { type: String, enum: ['esewa','khalti','cod'], default: 'cod' },
  status: { type: String, enum: ['initiated','paid','failed'], default: 'initiated' },
  gatewayRef: String
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
