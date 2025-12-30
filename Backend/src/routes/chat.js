import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Chat, Message } from '../models/Chat.js';

const router = express.Router();

router.post('/start', requireAuth, async (req,res)=>{
  const { otherUserId } = req.body;
  let chat = await Chat.findOne({ participants: { $all: [req.user.id, otherUserId] } });
  if (!chat) chat = await Chat.create({ participants: [req.user.id, otherUserId] });
  res.json(chat);
});

router.get('/:chatId/messages', requireAuth, async (req,res)=>{
  const msgs = await Message.find({ chat: req.params.chatId }).sort({ createdAt: 1 });
  res.json(msgs);
});

router.post('/:chatId/message', requireAuth, async (req,res)=>{
  const { text, priceOffer } = req.body;
  const msg = await Message.create({ chat: req.params.chatId, sender: req.user.id, text, priceOffer });
  res.json(msg);
});

export default router;
