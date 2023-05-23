const express = require("express");
const router = express.Router();
const userController = require("../controllers/userr.controller")

const { getProfile } = require("../controllers/user.controller");
const { isEmail } = require("../validations/validations");

router.post('/createShipper', userController.createShipper);
router.get("/profile", isEmail, getProfile);
router.put('/updateAccount/:id', userController.updateById);
router.delete('/deleteById/:id', userController.deleteById);
router.post('/findByName', userController.findByName);
router.get('/:id', userController.getById);
router.get('/', userController.getAll);
module.exports = router;
