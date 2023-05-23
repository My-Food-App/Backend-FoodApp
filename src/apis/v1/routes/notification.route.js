const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller")

router.post('/createNotfication', notificationController.create);
router.post('/getByUserId', notificationController.getByUserId);
router.put('/updateNotification/:id', notificationController.updateById);
router.get('/', notificationController.getAll);



module.exports = router