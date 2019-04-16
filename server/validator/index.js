exports.createPostValidator = (req, res, next) => {
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 character length")
    .isLength({ min: 4, max: 150 });
  req.check("body", "Write some description").notEmpty();
  req.check("body", "Body must be between 4 to 2000 character length")
    .isLength({ min: 4, max: 2000 });
    // check for errors 
  const errors = req.validationErrors();
  if(errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.userSignupValidator = (req, res, next) => {
  //name not null
  req.check("name", "Name is required").notEmpty();  
  //email not null, must be valid
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Invalid email address")
    .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  //password not null, min length 8, must contain a number
  req.check("password", "Password is required").notEmpty();
  req.check("password")
    .isLength({min: 8})
    .withMessage("Password must contain at least 8 character")
    .matches(/\d/)
    .withMessage("Password must contain at least a number");

  const errors = req.validationErrors();
  if(errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
}