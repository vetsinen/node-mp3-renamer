const Lame = require("node-lame").Lame;


convertToConstantBitrate()

async function convertToConstantBitrate(dir = "/home/jsdev/Music/", mp3track1 = 'ida.mp3' , mp3track2 = 'ido.mp3') {
    const encoder1 = new Lame({
        output: dir + 'out/' + mp3track1,
        bitrate: 128
    }).setFile(dir + mp3track1).encode()
    const encoder2 = new Lame({
        output: dir + 'out/' + mp3track2,
        bitrate: 128
    }).setFile(dir + mp3track2).encode().then(console.log('encoded track1'))
    const encoders = [encoder1, encoder2]
    console.log(encoders)
    Promise.all(encoders).then(el=>console.log(encoders))
    //console.log(encoder)

    return

    //     .then(() => {
    //         console.log('finished')
    //         waiting = false
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });
    // encoder
    //     .encode()
    //     .then(() => {
    //         console.log('finished')
    //         waiting = false
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });
}


// const encoder = new Lame({
//     output: "/home/jsdev/Music/ida.mp3",
//     bitrate: 160
// }).setFile("/home/jsdev/Music/ida.mp3");
//
//
// encoder
//     .encode()
//     .then(() => {
//         // Encoding finished
//     })
//     .catch(error => {
//         // Something went wrong
//     });