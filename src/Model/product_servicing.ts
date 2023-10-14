export default () => {
  const Mongoose = require("mongoose");

  const productSchema = new Mongoose.Schema(
    {
      info: {
        type: String,
        require: true,
      },
      serial_number: {
        type: Number,
        require: true,
      },
      warranty: {
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
