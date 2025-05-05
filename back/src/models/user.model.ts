import { Schema, model } from "mongoose";
import { ref } from "process";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orderedFoods: {
    type: [Schema.Types.ObjectId],
    ref: "foodCategory",
    default: [],
  },

  ttl: { type: String, required: false },
  isVerified: { type: Boolean, default: false },

  updatedAt: { type: String, required: true },

  createdAt: { type: Date, required: true },
});
export const userModel = model("user", userSchema);
