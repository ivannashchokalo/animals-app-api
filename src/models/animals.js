import { model, Schema } from "mongoose";

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["dog", "cat"],
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthDate: {
      type: Date,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

animalSchema.index({
  name: "text",
  breed: "text",
});

export const Animal = model("Animal", animalSchema);
