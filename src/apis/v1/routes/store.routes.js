const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller")

router.post('/createStore', storeController.create);
router.put('/updateStore/:id', storeController.updateById);
router.delete('/deleteStore/:id', storeController.deleteById);
router.post('/findByName', storeController.findByName);
router.post('/findByUserId', storeController.findByUserId);
router.get('/:id', storeController.getById);
router.get('/', storeController.getAll);

module.exports = router