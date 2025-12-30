import express from "express";
import { Op } from "sequelize";
import Crop from "../models/Crop.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * SUMMARY CARDS (Inventory dashboard)
 * GET /api/crops/inventory/summary
 */
router.get("/inventory/summary", auth, async (req, res) => {
  const userId = req.user.id;

  const crops = await Crop.findAll({ where: { userId } });

  const totalProducts = crops.length;
  const availableStock = crops.reduce((s, c) => s + (c.availableQty || 0), 0);
  const reserved = crops.reduce((s, c) => s + (c.reservedQty || 0), 0);
  const soldThisMonth = crops.reduce((s, c) => s + (c.soldQty || 0), 0);
  const lowStockItems = crops.filter(
    (c) => (c.availableQty || 0) > 0 && (c.availableQty || 0) <= (c.lowStockThreshold || 20)
  ).length;

  res.json({
    totalProducts,
    availableStock,
    reserved,
    soldThisMonth,
    lowStockItems,
  });
});

/**
 * LIST INVENTORY TABLE
 * GET /api/crops/inventory?search=&category=&status=&sort=name
 */
router.get("/inventory", auth, async (req, res) => {
  const userId = req.user.id;
  const { search = "", category = "All", status = "All", sort = "name" } = req.query;

  const where = { userId };

  if (search.trim()) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search.trim()}%` } },
      { category: { [Op.iLike]: `%${search.trim()}%` } },
    ];
  }
  if (category !== "All") where.category = category;
  if (status !== "All") where.status = status;

  const order =
    sort === "price"
      ? [["pricePerUnit", "ASC"]]
      : sort === "stock"
      ? [["availableQty", "DESC"]]
      : [["name", "ASC"]];

  const items = await Crop.findAll({ where, order });

  res.json(items);
});

/**
 * ADD PRODUCT
 * POST /api/crops
 */
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;

  const {
    name,
    category,
    unit = "kg",
    availableQty = 0,
    reservedQty = 0,
    soldQty = 0,
    pricePerUnit = 0,
    lowStockThreshold = 20,
    imageUrl = null,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Name and category are required" });
  }

  // status auto-calc
  const av = Number(availableQty) || 0;
  const thr = Number(lowStockThreshold) || 20;
  let status = "Available";
  if (av <= 0) status = "Out of Stock";
  else if (av <= thr) status = "Low Stock";

  const crop = await Crop.create({
    userId,
    name,
    category,
    unit,
    availableQty: av,
    reservedQty: Number(reservedQty) || 0,
    soldQty: Number(soldQty) || 0,
    pricePerUnit: Number(pricePerUnit) || 0,
    lowStockThreshold: thr,
    status,
    imageUrl,
  });

  res.status(201).json(crop);
});

/**
 * EDIT PRODUCT
 * PATCH /api/crops/:id
 */
router.patch("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const crop = await Crop.findOne({ where: { id, userId } });
  if (!crop) return res.status(404).json({ error: "Not found" });

  await crop.update(req.body);

  // recalc status after update
  const av = Number(crop.availableQty) || 0;
  const thr = Number(crop.lowStockThreshold) || 20;
  let status = "Available";
  if (av <= 0) status = "Out of Stock";
  else if (av <= thr) status = "Low Stock";
  await crop.update({ status });

  res.json(crop);
});

/**
 * DELETE PRODUCT
 * DELETE /api/crops/:id
 */
router.delete("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const crop = await Crop.findOne({ where: { id, userId } });
  if (!crop) return res.status(404).json({ error: "Not found" });

  await crop.destroy();
  res.json({ ok: true });
});

export default router;
