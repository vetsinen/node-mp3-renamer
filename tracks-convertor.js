"use strict";
// import *
const fs = require('fs');
const path = require('path');
const NodeID3 = require('node-id3');
const Lame = require("node-lame").Lame;
const track = 'Adalberto Alvarez - Deja La Mala Noche.mp3';

let directory
directory = '/home/jsdev/Downloads/Telegram Desktop/';
directory = '/home/jsdev/Music/Ассорти красивой музыки/';

iterateOnFiles(directory, renameAndReTitleTrack);

async function iterateOnFiles(dir, operation = backup_filenameAndTags) {
    const files = fs.readdirSync(dir);
    let c = 1;
    let shortNames = [];
    for (let i in files) {
        c++;
        let shortFileName = files[i];
        if (shortFileName.slice(-4).toLowerCase() !== '.mp3') {
            continue;
        }
        console.log(shortFileName)
        if (operation !== encodeToRegularBitrate) {
            operation(dir, shortFileName);
        }
        else {
            shortNames.push(shortFileName);
        }
    }
    if (operation === encodeToRegularBitrate) {
        encodeToRegularBitrate(dir, shortNames);
        console.log('encoded');
    }
}

function backup_filenameAndTags(directory, file) {
    let fullname = path.join(directory, file);
    let tags = NodeID3.read(fullname);
    tags.performerInfo = tags.title + '|' + tags.artist + '|' + tags.album + '|' + file;
    if (!tags.hasOwnProperty('title') || (tags.hasOwnProperty('title')) && tags.title.length < 3) {
        tags.title = file.toLowerCase();
    }
    tags.composer = tags.title.toLowerCase()+' - '+tags.artist.toLowerCase();
    const success = NodeID3.write(tags, fullname);
    return success;
}
function renameAndReTitleTrack(directory, file) {
    let fullname = path.join(directory, file);
    let tags = NodeID3.read(fullname);
    tags.composer = tags.composer.toLowerCase()
    tags.artist = tags.artist.toLowerCase();
    tags.title = (tags.album + '-' + tags.composer).toLowerCase();
    const success = NodeID3.write(tags, fullname);
    fs.renameSync(fullname, path.join(directory, tags.title + '.mp3'));
}
async function encodeToRegularBitrate(directory, files, bitrate = 128) {
    const directoryOut = directory + 'out/';
    fs.rmdirSync(directoryOut, { recursive: true });
    console.log(`${directoryOut} is deleted!`);
    fs.mkdirSync(directoryOut);
    console.log(files);
    let encoders = [];
    for (let i in files) {
        encoders.push(new Lame({
            output: directoryOut + files[i],
            bitrate: bitrate
        }).setFile(directory + files[i]).encode());
    }
    Promise.all(encoders).then(rez => console.log(encoders));
}
function filterComplexTags(tags) {
    let rez = {};
    for (var prop in tags) {
        if (typeof tags[prop] !== 'string') {
            continue;
        }
        rez[prop] = tags[prop];
    }
    return rez;
}
// let tags = NodeID3.read(filepath);console.log(JSON.stringify(tags));
