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

module.exports = router