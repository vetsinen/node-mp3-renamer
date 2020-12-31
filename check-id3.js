// import * as id3 from 'id3js';
import * as NodeID3  from 'node-id3'

/* Variables found in the following usage examples */

const filepath = './adi.mp3'

async function getTrackTags(fullAdress){
    return await id3.fromPath('./adi.mp3')
}

const filebuffer = Buffer.allocUnsafe(100)

let tags = {
    title: "Tomorrow",
    artist: "Kevin Penkin",
    album: "TVアニメ「メイドインアビス」オリジナルサウンドトラック",
    TRCK: "27"
}
const success = NodeID3.write(tags, filepath)

if (success) {
    tags = NodeID3.read(filepath)
    console.log(JSON.stringify(tags) )
}




// async option
// NodeID3.read(filepath, function(err, tags) {
//     console.log(tags)
// })

// const tags = await getTrackTags('./adi.mp3')
// console.log(tags )
