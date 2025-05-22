import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: [{ type: String }],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sub_categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    unit: { type: String },
    stock: { type: Number, default: null },
    price: { type: Number, default: null },
    description: {
      type: String,
      default: "",
    },
    more_detalis: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
