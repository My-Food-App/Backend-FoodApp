const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller")

router.post('/createProduct', productController.create);
router.put('/updateProduct/:id', productController.updateById);
router.delete('/deleteProduct/:id', productController.deleteById);
router.post('/findByName', productController.findByName);
router.post('/findByIdStore', productController.findByIdStore);
router.get('/:id', productController.getById);
router.get('/', productController.getAll);

module.exports = router