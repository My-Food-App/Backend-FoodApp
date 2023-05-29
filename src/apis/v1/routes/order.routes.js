const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller")

router.post('/createOrder', orderController.create);
router.put('/updateOrder/:id', orderController.updateById);
router.delete('/deleteOrder/:id', orderController.deleteById);
router.get('/getByStatus', orderController.getByStatus);
router.post('/getByUserId', orderController.getByUserId);
router.post('/getByStoreId', orderController.getByStoreId);
router.post('/getByShipperId', orderController.getByShipperId);
router.post('/getByOrderName', orderController.getByOrderName);
router.get('/:id', orderController.getById);
router.get('/', orderController.getAll);

module.exports = router