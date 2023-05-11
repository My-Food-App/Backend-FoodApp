const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller")

router.post('/createCategory', categoryController.create);
router.delete('/deleteCategory/:id', categoryController.deleteById);
router.get('/:id', categoryController.getById);
router.get('/', categoryController.getAll);

module.exports = router