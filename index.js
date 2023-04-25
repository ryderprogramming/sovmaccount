// Modules
const express = require("express");
const app = express()
const http = require("http");
const server = http.createServer(app);
const fs = require("fs");

// Port
const port = 3000;

// Router
app.use(express.static('static'));

// Routing
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

// Stream
app.get("/video", function(req, res){
    const range = req.headers.range;
    const video = req.query;
    if(!video.path){
        res.status(400).send("Requires Path")
    }
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    console.log(video.path)
    const videoPath = "videos/"+video.path+".mp4";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
})

server.listen(port, function(){
    console.log(`Listening on *:${port}`)
})