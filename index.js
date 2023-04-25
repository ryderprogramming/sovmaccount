// Modules
const express = require("express");
const app = express()
const http = require("http");
const server = http.createServer(app);

// Port
const port = 3000;

// Routing
app.get("/", function(req, res){
    res.send("Hello, world!");
});

server.listen(port, function(){
    console.log(`Listening on *:${port}`)
})