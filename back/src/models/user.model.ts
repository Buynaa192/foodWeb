import { Schema, model } from "mongoose";
import { ref } from "process";
const orderItemSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "order", required: true },
});
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  address: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orderedFoods: { type: [orderItemSchema], default: [] },

  ttl: { type: String, required: false },
  isVerified: { type: Boolean, default: false },

  updatedAt: { type: String, required: true },

  createdAt: { type: Date, required: true },
});
export const userModel = model("user", userSchema);
