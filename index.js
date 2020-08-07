const express = require("express")
const welcomeRouter = require("./posts/welcome-router")
const postsRouter = require("./posts/posts-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(welcomeRouter)
server.use(postsRouter)

server.listen(port, () => {
    console.log(`[ SERVER RUNNING AT http://localhost:${port} ... ]`)
})