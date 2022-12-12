const yt = require("yt-converter");
yt.getInfo("https://www.youtube.com/watch?v=dQw4w9WgXcQ").then(info => {
    console.log(info);
});