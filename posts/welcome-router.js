const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Welcome! This is my Node API 2 Project :)"
    })
})

module.exports = router