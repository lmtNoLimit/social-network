const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if(err || !post) {
        return res.json({error: err})
      }
      req.post = post;
      next();
    });    
}

exports.getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name email")
    .then(posts => res.json({posts}))
    .catch(err => res.json({error: err}));
}

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) return res.json({ error: "Image could not be uploaded" });
    let post = new Post(fields);
    req.profile.hashed_password = req.profile.salt = undefined;    
    post.postedBy = req.profile;
    if(files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save()
      .then(post => res.json({ post }))
      .catch(err => res.json({ error: err }));
  });
}

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("created")
    .exec((err, posts) => {
      if(err) return res.json({error: err});
      res.json(posts);
    });
}

exports.isPoster = (req, res , next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;  
  if(!isPoster) {
    return res.json({error: "User is not authorized!"});
  }
  next();
}

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err) => {
    if(err) {
      return res.json({error: err});
    }
    res.json({message: "Post removed successfully!"});
  });
}

exports.updatePost = (req, res) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save(err => {
    if(err) {
      return res.json({error: "User is not authorized!"});
    }
    res.json(post);
  });
}
