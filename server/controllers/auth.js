const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

exports.signup = async (req, res) => {
  const userExist = await Users.findOne({email: req.body.email});
  if(userExist) return res.status(400).json({ 
    error: "The account with this email already exist. Please signup with other email"
  });
  const user = await new Users(req.body);
  await user.save();
  res.json({ message: "Account created successfully! Please login" });
}

exports.signin = (req, res) => {
  // find user base on email
  const { email, password } = req.body;
  Users.findOne({email}, (err, user) => {
    // let error = { error: "Incorrect email or password!"};
    // if err or no user
    if(err || !user || !user.comparePassword(password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    // if has user -> auth
    // if(!user.comparePassword(password)) {
    //   return res.status(400).json({ error });
    // }
    // generate jwt
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token,  { expires: new Date(Date.now() + 90000) });
    
    // return response
    const { _id, name, email } = user;
    return res.status(200).json({ token, user: { _id, name, email }});
  });
}

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({message: "You are signed out!"});
}

exports.requireSignin = expressJwt({
  secret: process.env.SECRET, 
  userProperty: "auth"
});