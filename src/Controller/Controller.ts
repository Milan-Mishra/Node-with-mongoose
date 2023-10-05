import product_model from '../Model/Product_info';
import seller_model from '../Model/Seller_info';
const product = product_model();
const seller = seller_model();

const shoppingCart : any[]= [];

exports.NotFound = (req: any, res: any) => res.send({ message: 'invalid URL!' });

exports.insertProduct = async (req: any, res: any) => {

    const data = new product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    const result = await data.save();

    res.send({ message: "new Product has been added", result });
}

exports.listProduct = async (req: any, res: any) => {

    const data = await product.find();
    data.length ? res.send({ Message: "Available Product data", data }) : res.send({ message: "No Product data to display" });
}

exports.removeProduct = async (req: any, res: any) => {

    const product_id: string = req.params.id;
    const deleted_data = await product.findByIdAndDelete(product_id);

    const msg_string: any = deleted_data
        ? { message: "data delete sucessfull!", Deleted_data: deleted_data }
        : { message: "No data to Delete" };

    res.send(msg_string);
};

exports.removeSeller = async (req: any, res: any) => {

    const seller_id: string = req.params.id;
    const deleted_data = await seller.findByIdAndDelete(seller_id);

    const msg_string: any = deleted_data
        ? { message: "data delete sucessfull!", Deleted_data: deleted_data }
        : { message: "No data to Delete" };

    res.send(msg_string);
};

exports.showProfit = async (req: any, res: any) => {

    const profit: any = await product.aggregate([
        { $project: { name: 1, _id: 0, 'total_profit': { $multiply: ['$price', '$quantity'] } } }
    ])
    profit.length ? res.send({ Message: "Profit of product ", profit }) : res.send({ message: "No Product to display" });
};

exports.editProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updates = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      };
  
      // Find and update the product by ID
      const updatedProduct = await product.findByIdAndUpdate(productId, updates, {
        new: true, // Return the updated product
        runValidators: true // Run validators to ensure data validity
      });
  
      if (!updatedProduct) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      res.send({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  exports.addToCart = async (req, res) => {
    try {
     
      const productId = req.params.productId;
      const productData = await product.findById(productId);
      // Retrieve product details based on the product ID (you need to implement this)
     
  
      if (!productData) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      // Add the product to the shopping cart
      shoppingCart.push(productData);
  
      res.send({ message: 'Product added to the cart', shoppingCart });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  

  // Controller.js

// Calculate the total cost of items in the shopping cart
exports.calculateTotalCost = (req, res) => {
  try {
    // Assuming you have a shoppingCart array with cart items
    const totalCost = shoppingCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    res.send({ totalCost });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

  
  
  
