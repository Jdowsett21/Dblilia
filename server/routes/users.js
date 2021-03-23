const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const mongoose = require('mongoose');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const db = mongoose.connection;
let gfs;
db.once('open', function () {
  gfs = Grid(db.db, mongoose.mongo);
});
//=================================
//             User
//=================================

// setup to get default profile image for all users
// const originalProfileImage = new GridFsStorage({
//   db: db,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'defaultProfileImages',
//     };
//   },
// });

const storage = new GridFsStorage({
  db: db,
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: req.user._id,
      bucketName: 'profileImages',
    };
  },
});

const upload = multer({
  storage,
}).single('profileImage');

router.get('/defaultProfile', (req, res) => {
  gfs
    .collection('defaultProfileImages')
    .find()
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          message: 'Could not find files',
        });
      }
      let readstream = gfs.createReadStream({
        filename: files[0].filename,
      });
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
    });
});

router.get('/image/:filename', auth, (req, res) => {
  gfs
    .collection('profileImages')
    .find({ filename: req.params.filename, metadata: req.user._id })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          message: 'Could not find file',
        });
      }
      let readstream = gfs.createReadStream({
        filename: files[0].filename,
      });
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
    });
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    originalImage: req.user.originalImage,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    else {
      return res.status(200).json({
        success: true,
      });
    }
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.put('/update', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    }
  );
});

router.delete('/oldProfile', auth, (req, res) => {
  gfs
    .collection('profileImages')
    .findOneAndDelete(
      { metadata: req.user._id },
      { sort: { uploadDate: 1 } },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      }
    );
});

router.patch(
  '/uploadProfile',
  auth,
  // uploading new image
  upload,
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        image: req.file.originalname,
        originalImage: false,
      },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      }
    );
  }
);
module.exports = router;
