const fs = require('fs');
const path = require('path');
const zlib = require('zlib');


const lib = {}

lib.baseDir = path.join(__dirname, '/../.logs/');

//Append a string to file, and create the file if it doesn't already exist

lib.append = (file,str,callback)=>{
    // open the file for appending
    fs.open(lib.baseDir+file+'.log','a',(err,fileDescriptor)=>{
        console.log('i am the file descriptor in logs',fileDescriptor)
    if (!err && fileDescriptor){
        fs.appendFile(fileDescriptor,str+'\n',(err)=>{
            if(!err){
                fs.close(fileDescriptor,(err)=>{
                    if(!err){
                        callback(false)
                    }else{
                        callback('Error closing file that was being appended')
                    }
                })
            }
            else {
                callback('Error appending file descriptor')
            }
        })
    }
    else {
        callback('Could not open file for appending')
    }
    })
}



module.exports = lib