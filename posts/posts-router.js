const express = require("express")
const db = require("../data/db")

const router = express.Router()

// GET ALL POSTS
router.get("/posts", (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Error retrieving posts"
        })
    })  
})

// GET POSTS BY ID
router.get("/posts/:id", (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(400).json({
                message: "Post could not be found"
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Error retrieving post"
        })
    })
})

// GET POST COMMENTS BY ID
router.get("/posts/:postId/comments", (req, res) => {
    db.findPostComments(req.params.postId)
    .then((comments) => {
        res.json(comments)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Error retrieving comments"
        })
    })

})

// ADD A POST
router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing post title or contents"
        })
    }
    db.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error creating post"
            })
        })
})

// ADD A COMMENT TO A POST
router.post("/posts/:id/comments", (req, res) => {
    const id = req.params.id
    const newComment = req.body

    if (!newComment) {
        res.status(404).json({
            message: "Missing text body"
        })
    } else {
        db.findById(id)
            .then((post) => {
                if (post) {
                    db.insertComment(newComment)
                        .then(created => {
                            res.status(201).json(created)
                        })
                } else {
                    res.status(400).json({ "error": "Comment could not be created."})
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "Error retreiving post"
                })
            })
    }
})

// DELETE A POST
router.delete("/posts/:id", (req, res) => {
    const post = db.findById(req.params.id)

    if (!post) {
        res.status(404).json({
            message: "Post could not be found"
        })
    } else {
        db.remove(post)
        .then((post) => {
            res.status(200).json('Post has been deleted')
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error: The post could not be removed"
            })
        })
    }
})

// EDIT A POST
router.put("/posts/:id", (req, res) => {
    const id = req.params.id
    const post = db.findById(id)

  if (!req.body.title || !req.body.contents) {
      return res.status(400).json({
          message: "Please provide title and contents for the post"
      })
  }

  db.update(id, post)
  .then((post) => {
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({
            message: "The post could not be found"
        })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
        message: "Error updating the post"
    })
  })
  

   
})

module.exports = router