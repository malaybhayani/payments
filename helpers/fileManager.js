var logger = require('morgan');
var fs = require('fs');

var uploadFile = function(filePath, fileName, fileBytes){
    var generatedFileName = Date.now() + "_" + fileName;
    fs.mkdir(filePath, function(err){
        if(err){
            if(err.code == 'EEXIST')
                writeFile(filePath, generatedFileName, fileBytes);                        
        }
        else{
            writeFile(filePath, generatedFileName, fileBytes);
        }
    });
    return generatedFileName;
}

var writeFile = function(filePath, fileName, fileBytes){
    var writeStream = fs.createWriteStream(filePath + fileName);
    writeStream.write(fileBytes, "base64");
    writeStream.on('finish', ()=> {
        console.log('finished writing to file...');
    });
    writeStream.end(); 
}

module.exports.uploadFile = uploadFile;