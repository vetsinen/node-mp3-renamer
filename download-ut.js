const path = require('path')
const {getPlaylist} = require('@fabricio-191/youtube')
    .setDefaultOptions({
        location: 'AR',
        language: 'es-419'
    });
const yt = require("yt-converter");

(async () => {
    try {
        const pl = await getPlaylist('https://www.youtube.com/watch?v=U4-Eh7vR6AM&list=PL2DKD2ZOeTpikFlkKSNqZK_06YCtpBLWA&index=3');
        // console.log(pl);
        const vl = pl.videos;
        let cursor = -1

        function nextTrack() {
            cursor++;
            try {
                if (cursor < vl.length) {
                    yt.convertAudio({
                        url: vl[cursor].URL,
                        title: vl[cursor].title,
                        itag: 140,
                        directoryDownload: path.join(__dirname, 'downloads'),
                    }, () => {
                    }, nextTrack)
                }
            } catch (e) {
            }
        }
        nextTrack();
    } catch (e) {
        console.log(e);
    }
})();