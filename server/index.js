const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// HEROKU CODE TO DEPLOY STATIC FILES
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// USER ROUTES
app.use('/api/users', require('./routes/users'));

// BLOG ROUTES
app.use('/api/blog', require('./routes/blogs'));

// HEROKU CODE FOR ROUTING AND RELOADING PAGES
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
