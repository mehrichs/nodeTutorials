const fs = require('fs');

// reading files
fs.readFile('../Documents/exampleReadFile.txt', (error, data) => {
    if(error) {
        console.log(error);
    };
    console.log(data.toString());
});

// writing files
fs.writeFile('../Documents/exampleWriteFile.txt','Lorem ipsum dolore sit amet.', () => {
    console.log('file was written');
});

// directories
if (!fs.existsSync('TestDirectory')){
    fs.mkdir('TestDirectory', (error) => {
        if (error) {
            console.log(error);
        }
        console.log('directory created');
    });
} else {
    fs.rmdir('TestDirectory', () => {
        console.log('directory deleted');
    });
};

// deleting files
if(fs.existsSync('../Documents/deleteMe.txt')) {
    fs.unlink('../Documents/deleteMe.txt',(error) => {
        if (error) {
            console.log(error);
        }
        console.log('file deleted');
    });
} else {
    console.log('no file to delete');
};