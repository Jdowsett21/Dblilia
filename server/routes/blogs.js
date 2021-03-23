const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const db = mongoose.connection;

// OPENING UP A NEW GRIDFS CONNECTION TO THE DATABASE
let gfs;
db.once('open', function () {
  gfs = Grid(db.db, mongoose.mongo);
});
//=================================
//             Blogs
//=================================

// SETTING UP FILE INFORMATION
// METADATA STORES USER ID
// BLOG IMAGES ALL STORES IN blogImages bucket
const storage = new GridFsStorage({
  db: db,
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: req.user._id,
      bucketName: 'blogImages',
    };
  },
});

// USING MULTER TO UPLOAD IMAGE
const upload = multer({ storage: storage }).single('blogImage');

// GETS ALL BLOGS BY USER_ID
router.get('/getBlogs', auth, async (req, res) => {
  await Blog.find({ userId: req.user._id }, (err, doc) => {
    if (err) res.status(500).json({ message: 'Could not get blogs' });

    res.status(200).json(doc);
  });
});

// GETS BLOG IMAGE FROM blogImages bucket  BY FILENAME AND USER_ID for BlogItem
router.get('/blogImage/:filename', auth, (req, res) => {
  gfs
    .collection('blogImages')
    .find({ filename: req.params.filename, metadata: req.user._id })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        console.log(err);
        return res.status(404).json({
          message: 'Could not find file',
        });
      }
      // create readstream to display image by route link in frontend
      let readstream = gfs.createReadStream({
        filename: files[0].filename,
      });
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
    });
});

// create new blog with userId
router.post('/createBlog', auth, upload, async (req, res) => {
  // prevents same file from being uploaded by the same user
  // which would cause issues when deleting file by user id and filename
  const duplicateFileName = await Blog.find({
    image: req.file.originalname,
    userId: req.user._id,
  });
  // STOP FILE UPLOAD IF DUPLICATE FILE NAME FOR SAME USER
  if (duplicateFileName.length > 0) {
    return res
      .status(500)
      .json({ message: 'Cannot upload file with same name' });
  }

  const blog = new Blog({
    title: req.body.title,
    image: req.file.originalname,
    userId: req.user._id,
  });

  await blog.save((err, doc) => {
    if (err) return res.json({ success: false, err });
  });
  res.status(200).send(blog);
});

// DELETE BLOG BY BLOG ID
router.delete('/deleteBlog/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  await Blog.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200);
  });
});

// DELETE OLD IMAGE FROM DELETED BLOG
// SEARCHES FILE BY blogImages BUCKET AND FILENAME AND USERID
router.delete('/deleteBlogImage/:filename', auth, (req, res) => {
  gfs
    .collection('blogImages')
    .findOneAndDelete(
      { filename: req.params.filename, metadata: req.user._id },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      }
    );
});

router.patch(
  '/updateBlog/:id',
  auth,
  // uploading new image
  upload,
  async (req, res) => {
    // prevents same file from being uploaded by the same user
    // which would cause issues when deleting file by user id and filename
    const duplicateFileName = await Blog.find({
      image: req.file.originalname,
      userId: req.user._id,
    });

    // STOP FILE UPLOAD IF DUPLICATE FILE NAME FOR SAME USER
    if (duplicateFileName.length > 0) {
      return res
        .status(500)
        .json({ message: 'Cannot upload file with same name' });
    }

    // find blog to find old image name
    const blog = await Blog.findById(req.params.id);

    // update blog item
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
