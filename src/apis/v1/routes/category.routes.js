const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller")

router.post('/createCategory', categoryController.create);
router.put('/updateCategory/:id', categoryController.updateById);
router.delete('/deleteCategory/:id', categoryController.deleteById);
router.post('/findByName', categoryController.findByName);
router.get('/:id', categoryController.getById);
router.get('/', categoryController.getAll);

module.exports = router