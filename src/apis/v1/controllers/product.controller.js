const Product = require("../models/product");

class ProductsController {
  async create(req, res) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => res.json(product))
      .catch((error) => res.status(500).send(error.message));
  }
  async updateById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body).lean()
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteById(req, res) {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id).lean()
      res.json("Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).lean()
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const products = await Product.find().lean()
      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async findByName(req,res) {
    try {
        const products = await Product.find({'name': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async findByIdStore(req,res) {
  try {
      const products = await Product.find({'idStore': { '$regex' : req.body.keyWord, '$options' : 'i' }}).lean()
      res.json(products);
  } catch (error) {
      res.status(500).send(error.message)
  }
}
}

module.exports = new ProductsController();
