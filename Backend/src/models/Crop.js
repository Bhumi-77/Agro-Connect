import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Crop = sequelize.define(
  "Crop",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: { // owner (farmer)
      type: DataTypes.UUID,
      allowNull: false,
    },

    name: { type: DataTypes.STRING, allowNull: false },      // "Organic Rice"
    category: { type: DataTypes.STRING, allowNull: false },  // "Grains"
    unit: { type: DataTypes.STRING, defaultValue: "kg" },    // "kg"

    availableQty: { type: DataTypes.FLOAT, defaultValue: 0 },
    reservedQty: { type: DataTypes.FLOAT, defaultValue: 0 },
    soldQty: { type: DataTypes.FLOAT, defaultValue: 0 },

    pricePerUnit: { type: DataTypes.FLOAT, defaultValue: 0 },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Available",
      validate: { isIn: [["Available", "Low Stock", "Out of Stock", "Reserved"]] },
    },

    lowStockThreshold: { type: DataTypes.FLOAT, defaultValue: 20 },

    imageUrl: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "crops",
    timestamps: true,
  }
);

export default Crop;
