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

router.get('/getBlogs', auth, async (req, res) => {
  await Blog.find({ userId: req.user._id }, (err, doc) => {
    if (err) res.status(500).json({ message: 'Could not get blogs' });

    res.status(200).json(doc);
  });
});

router.post(
  '/createBlog',
  auth,
  upload.single('blogImage'),
  async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      image: req.file.originalname,
      userId: req.user._id,
    });

    await blog.save((err, doc) => {
      if (err) return res.json({ success: false, err });
    });
    res.status(200).send(blog);
  }
);

router.delete('/deleteBlog/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  console.log(
    '🚀 ~ file: blogs.js ~ line 55 ~ router.delete ~ req.params.id',
    req.params.id
  );

  const filePath = `./client/public/uploads/${req.user._id}/blog/${blog.image}`;

  fs.unlink(`${filePath}`, (err) => {
    if (err) throw err;
    console.log(`${filePath} was successfully deleted`);
  });
  await Blog.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200);
  });
});

router.patch(
  '/updateBlog/:id',
  auth,
  // uploading new image
  upload.single('blogImage'),
  async (req, res) => {
    // find blog to find old image name
    const blog = await Blog.findById(req.params.id);

    //isolate old image pathway
    const filePath = `./client/public/uploads/${req.user._id}/blog/${blog.image}`;

    // remove old image
    fs.unlink(`${filePath}`, (err) => {
      if (err) throw err;
      console.log(`${filePath} was successfully deleted`);
    });

    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        image: req.file.originalname,
        title: req.body.title,
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
