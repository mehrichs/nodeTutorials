const fs = require('fs');

//read stream
const readStream = fs.createReadStream('../Documents/exampleReadStreamFile.txt', {encoding: 'utf-8'});
const writeStream = fs.createWriteStream('../Documents/exampleWriteStreamFile.txt');

//listener for data events/run callback function after every data event
/*readStream.on('data', (chunk) => {
    console.log('----New Chunk----');
    console.log(chunk);
    //write stream
    writeStream.write('\n----New Chunk----\n');
    writeStream.write(chunk);
});*/

//alternative to the above
//pipe the read stream into the writestream
readStream.pipe(writeStream);

