const bcrypt = require('bcrypt')
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

const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    var account = await users
    .findOne({
      $or: [{ username }, { email }]     
    })
    .lean();

    console.log("account: - ", account);

    if (account && await bcrypt.compare(password,account.password)) {
      res.status(200).json({
        data: account_user(account),
        access_token: create_access_token(account),
        refresh_token: create_refresh_token(account),
      });
    } else {
      res.status(404).json({
        content: "Your username or password is incorrect, please login again.",
      });
    }
  } catch(error) {
    console.log(error)
    res.status(500).json({
      code: 500,
      status: "Fail",
      content: "Cant verification this account",
    });
  }
});

const register = asyncHandler(async (req, res, next) => {
  try {
    const  hashedPassword = await bcrypt.hash(req.body.password,10)
    const password = hashedPassword
    const { username, email, gender, created_date, status, fullname, 
      phone, birthday,address,storeId} = req.body;
      
    let account = await users.findOne({ $or: [{username, phone, email}]}).lean();
    if(account) {
      let error = ((account.username == username && "Username") || (account.email == email && "Email ") || (account.phone == phone && "Phone"))  + " existed";
      res.status(401).json({
        code : 401,
        error,
      })
    } else {
      verifyMail(email).then(async ({code}) => {
        let account = new usersNotAuth({
          username, 
          password, 
          email, 
          gender, 
          created_date, 
          status, 
          fullname, 
          phone, 
          birthday,
          address,
          storeId,
          code
        });
        await account.save();
        awaitDeleteAccount(email);
        return res.status(200).json({
          code: 200, 
          status: "OK", 
          content: "Please check your mail for verification"
        });
      }).catch((e) => {
        console.log(e);
        res.status(200).json({
          code : 500,
          status: "Fail",
          content: "Error: Something went wrong! Please ensure all fields are in the right format!"
        });
      })
    }
  } catch(error) {
    console.log(error)
    if (error.isJoi === true) {
      return next(createError.BadRequest("Invalid Email/Password"));
    } else {
      res.status(500).json({
        content: "Cant register this account",
        error
      });
    }
  }
})

const verify = asyncHandler( async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const userNotAuth = await usersNotAuth.findOne({email}).select("+password").lean();
    await usersNotAuth.findOneAndDelete({email})
    
    if(userNotAuth) {
      console.log("userNotAuth: ", userNotAuth)
      console.log("userNotAuth.code: ", userNotAuth.code)
      console.log("code: ", code);
      if(userNotAuth.code == code) {
        const { username, password, email, gender, created_date, status, fullname, phone, birthday,address,storeId } = userNotAuth;
        console.log("ps: ", password);
        console.log("ps: ", userNotAuth);
        const user = new users({
          username, password, email, gender, created_date, status, fullname, phone, birthday,address,storeId
        });
        await user.save();
        return res.status(200).json({
          code: 200, 
          status: "OK",
          content: "Successfully!!!"
        });
      } else {
        return res.status(400).json({
          code: 400, 
          status: "Fail",
          content: "Your code is incorrect. Please check your email and again"
        });
      }
    } else {
      return res.status(401).json({
        code: 401, 
        status: "Fail", 
        content: "Your code expired. Please try register again"
      });
    }
  } catch(error) {
    console.log(error);
    return res.status(500).json({
        code: 500, 
        status: "Fail", 
        content: "Error"
    })
  }
});

const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    content: "Logout successfully!!!"
  })
})

module.exports = {
  login,
  register,
  verify,
  logout
};
