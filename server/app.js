const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3001;
dotenv.config();

// call route
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => console.log(`DB connect error: ${err}`));
//docs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err) return res.json({ error: err });
    const docs = JSON.parse(data, {encoding: 'utf8'});
    res.json(docs);
  });
})

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
app.use('/', postRoute);
app.use('/', authRoute);
app.use('/', userRoute);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: "Unauthorized!!" });
  }
});

module.exports = app;