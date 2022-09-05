/*
Library to store and edit data
*/

// Dependencies

const fs = require('fs');
const path = require('path');


// Container for the module to be exported

const lib = {}

lib.baseDir = path.join(__dirname, '/../.data/');

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










//Export the module

module.exports = lib