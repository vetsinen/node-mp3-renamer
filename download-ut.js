const path = require('path')
const { getPlaylist } = require('@fabricio-191/youtube')
    .setDefaultOptions({
        location: 'AR',
        language: 'es-419'
    });
const yt = require("yt-converter");

(async () => {
    try {
        const pl = await getPlaylist('https://www.youtube.com/playlist?list=PLen9XNx4yIl8ePUWbRsgGC69uLjHu9UON');
        // console.log(pl);
        const vl = pl.videos;
        let cursor = - 1
        function nextTrack(){
            cursor++;
            if (cursor<vl.length){
                yt.convertAudio({
                    url: vl[cursor].URL,
                    itag: 140,
                    directoryDownload: path.join(__dirname, 'downloads'),
                },()=>{},nextTrack)
            }
        }
        nextTrack();
    }
    catch (e){
        console.log(e);
    }
})();