import express from 'express';

const router = express.Router();

// Super-simple linear regression using past (price, quantity) pairs per crop name.
// In real life, you'd store historical sales and train a proper model.
function simpleLinearRegression(xs, ys) {
  const n = xs.length;
  const meanX = xs.reduce((a,b)=>a+b,0)/n;
  const meanY = ys.reduce((a,b)=>a+b,0)/n;
  let num = 0, den = 0;
  for (let i=0;i<n;i++){
    num += (xs[i]-meanX)*(ys[i]-meanY);
    den += (xs[i]-meanX)**2;
  }
  const m = den === 0 ? 0 : num/den;
  const b = meanY - m*meanX;
  return { m, b };
}

router.post('/predict-price', async (req,res)=>{
  const { cropName, quantity } = req.body;
  // Mock historical data by crop
  const history = {
    tomato: { q: [1,5,10,20], p: [50,44,40,38] },
    potato: { q: [5,10,20,50], p: [30,28,26,24] },
    onion:  { q: [2,5,10,20], p: [80,75,70,65] }
  };
  const key = (cropName||'').toLowerCase();
  const h = history[key] || { q: [1,5,10,20], p: [100,95,90,85] };
  const { m, b } = simpleLinearRegression(h.q, h.p);
  const predicted = m * (Number(quantity)||1) + b;
  res.json({ cropName, quantity: Number(quantity)||1, predictedPricePerUnit: Math.max(1, Math.round(predicted)) });
});

export default router;
