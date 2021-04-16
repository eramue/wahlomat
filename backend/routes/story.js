const Story = require("../models/story");
const express = require("express");
const router = express.Router();


router.post("/story", (req, resp, next) => {
  const story = new Story({
    subject: req.body.thema,
    question: req.body.question,
    answers: req.body.answers,
  });

  story.save().then((result) => {
    console.log("AFTER SAVE", story);
    resp.status(201).json({ message: "success", storyId: result._id });
  });
});

router.get("/story", (req, resp, next) => {
  Story.find().then((documents) => {
    resp
      .status(200)
      .json({ message: "Sucessfully from Server.", stories: documents });
  });
});




router.delete("/story/:id", (req, resp, next) => {
  Story.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    resp
      .status(200)
      .json({ message: "Successfully deleted story with id " + req.params.id });
  });
});
/**

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
 */
module.exports = router;