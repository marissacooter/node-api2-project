const express = require("express")
const db = require("../data/db")

const router = express.Router()

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

module.exports = router