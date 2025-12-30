import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Payment from '../models/Payment.js';

const router = express.Router();

router.post('/initiate', requireAuth, async (req,res)=>{
  const { farmerId, cropId, amount, method } = req.body;
  const p = await Payment.create({ buyer: req.user.id, farmer: farmerId, crop: cropId, amount, method });
  // NOTE: Integrate eSewa/Khalti SDKs here. For now, return a mock reference.
  p.gatewayRef = `REF-${Date.now()}`;
  await p.save();
  res.json(p);
});

router.post('/:id/confirm', requireAuth, async (req,res)=>{
  const p = await Payment.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  // In real gateway flow, verify server-to-server. Here we'll mark paid.
  p.status = 'paid';
  await p.save();
  res.json(p);
});

export default router;
