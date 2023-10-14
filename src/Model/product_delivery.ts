export default () => {
  const Mongoose = require("mongoose");

  const productDelieverySchema = new Mongoose.Schema(
    {
      address: {
        type: String,
        require: true,
      },
      country: {
        type: String,
        require: true,
      },
      state: {
        type: String,
        require: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  return Mongoose.model("Product_delivery_info", productDelieverySchema);
};
