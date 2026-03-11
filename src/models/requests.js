import { Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    animalId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Request = model("Request", requestSchema);
