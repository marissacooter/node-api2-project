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

module.exports = router