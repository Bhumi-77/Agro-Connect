import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Demand from '../models/Demand.js';

const router = express.Router();

router.post('/', requireAuth, async (req,res)=>{
  const d = await Demand.create({ ...req.body, postedBy: req.user.id });
  res.json(d);
});

router.get('/', async (req,res)=>{
  const list = await Demand.find({ status: 'open' }).sort({ createdAt: -1 });
  res.json(list);
});

export default router;
