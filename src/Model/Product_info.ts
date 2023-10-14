export default () => {
  const Mongoose = require("mongoose");

  const productSchema = new Mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  return Mongoose.model("Product_sell_info", productSchema);
};
