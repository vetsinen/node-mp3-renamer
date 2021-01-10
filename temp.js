const Lame = require("node-lame").Lame;

const encoder = new Lame({
    output: "/home/jsdev/Music/ida.mp3",
    bitrate: 160
}).setFile("/home/jsdev/Music/ida.mp3");

encoder
    .encode()
    .then(() => {
        // Encoding finished
    })
    .catch(error => {
        // Something went wrong
    });