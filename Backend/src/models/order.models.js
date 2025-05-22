import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: [true, "provide orderId"],
      unique: true,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product_details: { name: String, Image: Array },
    payment_id: { type: String },
    payment_status: {
      type: String,

      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    /*delivery_status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },*/
    subTotalAmt: { type: Number, default: 0 },
    totalAmt: { type: Number, default: 0 },
    invoice_receipt: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
