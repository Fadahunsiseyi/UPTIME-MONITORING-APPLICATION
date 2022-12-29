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

lib.compress = (logId,newFileId,callback) => {
    const sourceFile = logId+'.log';
    const destFile = newFileId+'.gz.b64'

    //Read the source file
    fs.readFile(lib.baseDir+sourceFile,'utf-8',(err,inputString) => {
        if(!err && inputString){
            //compress the data using gzip
            zlib.gzip(inputString,(err,buffer)=>{
                if(!err && buffer){
                    //send the data to the destination file
                    fs.open(lib.baseDir+destFile,'wx',(err,fileDescriptor)=>{
                        if(!err && fileDescriptor){
                            //write to the destination file
                            fs.writeFile(fileDescriptor,buffer.toString('base64'),(err)=>{
                                if(!err){
                                    fs.close(fileDescriptor,(err)=>{
                                        if(!err){
                                            callback(false)
                                        } else {
                                            callback(err)
                                        }
                                    })
                                } else {
                                    callback(err)
                                }
                            })
                        }
                        else {
                            callback(err)
                        }
                    })
                }
                else {
                    callback(err)
                }
            })
        }
        else{
            callback(err)
        }
    })
}


//Decompress the content of a .gz.b64 file into a string variables

lib.decompress = (fileId, callback) =>{
    const fileName = fileId+".gz.b64";
    fs.readFile(lib.baseDir+fileName,'utf-8',(err,str)=>{
        if(!err && str){
            //decompress the data
            const inputBuffer = Buffer.from(str,'base64')
            zlib.unzip(inputBuffer,(err,outputBuffer)=>{
                if(!err && outputBuffer){
                    //callback
                    const str = outputBuffer.toString()
                    callback(false,str)
                }
                else{
                    callback(err)
                }
            })
        }
        else {
            callback(err)
        }
    })
}


//Truncate a log file

lib.truncate = (logId,callback) =>{
    fs.truncate(lib.baseDir+logId+'.log',0,(err)=>{
        if(!err){
            callback(false)
        } else {
            callback(err)
        }
    })
}




module.exports = lib