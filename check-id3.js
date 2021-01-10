// import *
const fs = require('fs')
const path =require('path')
const NodeID3 =  require('node-id3')

const track = 'Adalberto Alvarez - Deja La Mala Noche.mp3'
const directory = '/home/jsdev/Music/bacha4/'

function backup_filenameAndTags(directory, file){
    let fullname =path.join(directory,file)
    let tags = NodeID3.read(fullname)
    tags.performerInfo = tags.title+'|'+tags.artist+'|' + tags.album + '|' + file
    if (tags.title.length<3){tags.title=file.toLowerCase()}
    tags.composer = tags.title
    const success = NodeID3.write(tags, fullname)
    return success
}

function renameAndReTitleTrack(directory, file){
    let fullname =path.join(directory,file)
    let tags = NodeID3.read(fullname)
    tags.title = (tags.album+'-'+tags.composer).toLowerCase()
    const success = NodeID3.write(tags, fullname)
    fs.renameSync(fullname,path.join(directory,tags.title+'.mp3'))
}

function filterComplexTags(tags) {
    let rez = {}
    for (var prop in tags) {
        if (typeof tags[prop] !== 'string') {
            continue
        }
        rez[prop] = tags[prop]
    }
    return rez
}

function iterateOnFiles(dir, operation=backup_filenameAndTags){
    const files = fs.readdirSync(dir);
    let c=1
    for (let i in files){
        c++
        let shortFileName = files[i]
        if (shortFileName.slice(-4)!=='.mp3'){continue}
        console.log(shortFileName)
        operation(dir, shortFileName)

        // let fullFileName = dir + '/' + shortFileName;
        // let tags = NodeID3.read(fullFileName)
        // console.log(shortFileName, JSON.stringify(filterComplexTags(tags)))
    }
}

iterateOnFiles(directory,renameAndReTitleTrack)
// let tags = NodeID3.read(filepath);console.log(JSON.stringify(tags));

