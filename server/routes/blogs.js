const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');
//=================================
//             User
//=================================

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./client/public/uploads/${req.user._id}/blog/`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/getBlogs', auth, (req, res) => {
  Blog.find({ userId: req.user._id }, (err, doc) => {
    if (err) res.status(500).json({ message: 'Could not get blogs' });
    console.log(doc);
    res.status(200).json(doc);
  });
});

router.post('/createBlog', auth, upload.single('blogImage'), (req, res) => {
  console.log(req.file.originalname);
  const blog = new Blog({
    title: req.body.title,
    image: req.file.originalname,
    userId: req.user._id,
  });
  console.log(blog);
  blog.save((err, doc) => {
    if (err) return res.json({ success: false, err });
  });
  res.status(200).send(blog);
});

router.delete('/deleteBlog', (req, res) => {
  User.findOneAndUpdate({ _id: req.body._id }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200);
  });
});

router.patch(
  '/updateBlog',
  auth,
  // uploading new image
  upload.single('profileImage'),
  (req, res) => {
    const filePath = `./client/public/uploads/${req.user._id}/profile/`;

    // searching through image files in the individuals profile folder
    fs.readdir(filePath, (err, files) => {
      if (err) throw err;
      files.filter((file) => {
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
          _id: req.user._id,
          isAdmin: req.user.role === 0 ? false : true,
          isAuth: true,
          email: req.user.email,
          name: req.user.name,
          lastname: req.user.lastname,
          role: req.user.role,
          image: req.file.originalname,
          originalImage: false,
        });
      }
    );
  }
);
module.exports = router;
