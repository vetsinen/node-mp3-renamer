const detect = require('bpm-detective');
const { AudioContext } = require('web-audio-api');
const context = new AudioContext()

// Fetch some audio file
fetch('/home/jsdev/node-mp3-renamer/tmp/salra-9-yo te pido amor - paquito guzman.mp3.wav').
    then(async function (response) {
    // Get response as ArrayBuffer
    const buffer = await response.arrayBuffer()

    // Decode audio into an AudioBuffer
    const data = await new Promise(function (resolve, reject) {
        context.decodeAudioData(buffer, resolve, reject)
    });

    // Run detection
    const bpm = detect(data)
    alert(`Detected BPM: ${bpm}`)
}).catch(console.error)