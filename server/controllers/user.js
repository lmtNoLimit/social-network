const _ = require('lodash');
const User = require('../models/user');

//get all user
exports.getUsers = (req, res) => {
  User.find().select("_id name email created")
    .then(user => res.json({user}))
    .catch(err => res.json({error: err}));
}
// find user by id
exports.userById = (req, res, next, id) => {
  User.findById(id)
  .exec((err, user) => {
    if(err || !user) {
      res.json({error: "User not found!"});
    }
    req.profile = user;
    next();
  });
}
//get single user
exports.getUser = (req, res) => {
  req.profile.hashed_password = req.profile.salt = undefined;
  return res.json(req.profile);
}

//update user
exports.updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(err => {
    if(err) {
      return res.json({error: "User is not authorized!"});
    }
    user.hashed_password = user.salt = undefined;
    res.json(user);
  });
}
//delete user
exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove(err => {
    if(err) {
      return res.json({error: "User is not authorized!"});
    }
    user.hashed_password = user.salt = undefined;
    res.json({message: "Your account has been removed!"});
  });
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth.id;
  if(!authorized) {
    return res.json({
      error: "User is not authorized to perform this action!"
    });
  }
  next();
}

