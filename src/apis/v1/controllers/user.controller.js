const asyncHandler = require("../helpers/asyncHandler");
const mongoose = require("mongoose");
const { users, usersNotAuth } = require("../models/users");
const config = require("../../../configs/configs");
const verifyMail = require("../utils/verifyEmail");
const awaitDeleteAccount = require("../utils/queueDeleteAccount");
const {
  account_user,
  create_access_token,
  create_refresh_token,
} = require("../helpers/authorization");

const getProfile = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const result = users.findOne({email}).lean();
    if(result) {
        return res.status(200).json({
            data: result,
            code: 200,
            status: "OK"
        });
    } else {
        return res.status(403).json({
            code: 403,
            status: "Fail",
            content: `Cant find user with email ${email}`
        })
    }
})

module.exports = {
    getProfile
};
