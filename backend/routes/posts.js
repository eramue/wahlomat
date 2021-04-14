const Post = require("../models/stories");
const express = require("express");
const router = express.Router();


router.post("", (req, resp, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save().then((result) => {
    console.log("AFTER SAVE", post);
    resp.status(201).json({ message: "success", postId: result._id });
  });
});
router.delete("/:id", (req, resp, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    resp
      .status(200)
      .json({ message: "Successfully deleted post with id " + req.params.id });
  });
});

router.put("/:id", (req, resp, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.params.title,
    content: req.params.content,
  });
  console.log("before1" + post.content);
  Post.updateOne({ _id: req.params.id }, post).then( (result) => {
    console.log("updated.", result);
    console.log("post.", post);
    resp.status(200).json({message: "Successfully updated post."});
  });
});

router.get("", (req, resp, next) => {
  Post.find().then((documents) => {
    resp
      .status(200)
      .json({ message: "Sucessfully from Server.", posts: documents });
  });
});

router.get("/:id", (req, resp, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
    resp
      .status(200)
      .json(post );
  } else {
    reps.status(404).json({message: "not found."});
  }

  });
});

module.exports = router;
