const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');
//=================================
//             User
//=================================

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./client/public/uploads/${req.user._id}/profile/`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function createFolder(path, mask, cb) {
  if (typeof mask == 'function') {
    // allow the `mask` parameter to be optional
    cb = mask;
    mask = 0777;
  }
  fs.mkdir(path, mask, function (err) {
    if (err) {
      if (err.code == 'EEXIST') cb(null);
      // ignore the error if the folder already exists
      else cb(err); // something else went wrong
    } else cb(null); // successfully created folder
  });
}

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
      createFolder(
        path.join(__dirname, `../../client/public/uploads/`) + `${user._id}`,
        0744,
        function (err) {
          if (err) return res.json({ success: false, err });
        }
      );
      setTimeout(() => {
        createFolder(
          path.join(__dirname, `../../client/public/uploads/${user._id}/`) +
            'blog',
          0744,
          function (err) {
            if (err) return res.json({ success: false, err });
          }
        );
      }, 500);
      setTimeout(() => {
        createFolder(
          path.join(__dirname, `../../client/public/uploads/${user._id}/`) +
            'profile',
          0744,
          function (err) {
            if (err) return res.json({ success: false, err });
          }
        );
      }, 500);

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

router.patch(
  '/uploadProfile',
  auth,
  // uploading new image
  upload.single('profileImage'),
  (req, res) => {
    const filePath = `./client/public/uploads/${req.user._id}/profile/`;

    // searching through image files in the individuals profile folder
    fs.readdir(filePath, (err, files) => {
      if (err) throw err;
      files.filter((file) => {
        // must search through files as file might not exists
        // filtering out most recent upload
        if (file !== req.file.originalname)
          // if file is not newest upload then delete the file
          fs.unlink(`${filePath}${file}`, (err) => {
            if (err) throw err;
            console.log(`${filePath}${file} was successfully deleted`);
          });
      });
    });

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
