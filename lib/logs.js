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

//List all the logs, and optionally include all the compressed logs
lib.list = (includeCompressedLogs,callback) =>{
    fs.readdir(lib.baseDir,(err,data)=>{
        if(!err && data && data.length > 0){
            let trimmedFileNames = []
            data.forEach((fileName)=>{
                //Add the .log files
                if(fileName.indexOf('.log') > -1 ){
                    trimmedFileNames.push(fileName.replace('.log', ''));
                }
                //Add on the .gz files
                if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
                    trimmedFileNames.push(fileName.replace('.gz.b64', ''));
                }
            })
            callback(false,trimmedFileNames)
        }
        else {
            callback(err,data)
        }
    })
}

//Compress the contents of the .log file into a .gz.b64 file within the same directory





module.exports = lib