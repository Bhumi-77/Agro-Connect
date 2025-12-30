// Backend/src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "farmer",
      validate: { isIn: [["farmer", "buyer", "admin"]] },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    location: {
      type: DataTypes.JSONB, // ✅ better in Postgres than JSON
      allowNull: true,
    },

    language: {
      type: DataTypes.STRING,
      defaultValue: "en",
      validate: { isIn: [["en", "np"]] },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
