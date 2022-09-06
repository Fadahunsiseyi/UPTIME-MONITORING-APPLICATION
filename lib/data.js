/*
Library to store and edit data
*/

// Dependencies

const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');


// Container for the module to be exported

const lib = {}

lib.baseDir = path.join(__dirname, '/../.data/');


// Write data to a file

lib.create = (dir,file,data,callback) => {
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err,fileDescriptor) => {
        if(!err && fileDescriptor){
            //Convert data to string
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData, (err) => {
                if(!err){
                    fs.close(fileDescriptor, (err) => {
                        if(!err) return callback(false);
                        callback('Error closing new file');
                    });
                }
                else {
                    callback('Error writing to new file')
                }
            })
        }
        else {
            callback('Could not create new file, it may already exist.');
        }
    })
}


// Read data from a file

lib.read = (dir,file,callback) => {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data) => {
        if(!err && data) {
            const parsedData = helpers.parseJsonToObject(data)
            callback(false,parsedData);
        } else {
            callback(err,data);
        }
    });
}


//Update data from a file


lib.update = (dir,file,data,callback) => {
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor) => {
      if(!err && fileDescriptor) {
         //Convert data to string
         const stringData = JSON.stringify(data);

         //Truncate file, before updating
         fs.truncate(fileDescriptor, (err) => {
            if(!err) {
                fs.writeFile(fileDescriptor, stringData,(err) => {
                    if(!err) {
                        fs.close(fileDescriptor,(err) => {
                            if(!err) return  callback(false);
                            callback('Error closing existing file')
                        })
                    }
                    else {
                        callback('Error writing to existing file')
                    }
                })
            }
            else {
                callback('Error: Could not truncate file')
            }
         })
      }
      else {
        callback('Could not open the file for editing, it may not exist yet.')
      }
    });
}


//Delete file

lib.delete = (dir,file,callback) => {
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err) => {
        if(!err) return callback(false);
        callback('Error deleting file')
    })
}

//Export the module

module.exports = lib