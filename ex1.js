// 1. Use the Native Modules in Node 
// a)Write a text saying The process of Santification to a file called redemption.txt
// using
// the fs module
// b)Appending a text saying Pilgrims Progress below the same file.
// c)Delete the txt in (a) from the file
// 2.Create a module name it anything that showcase the current date and time 
// when required in your ServiceWorkerRegistration
// Ensure to be able to view the date and time in your REPL

// const fs = require('fs');
//(a)
fs.writeFile('./redemption.txt', 'The process of Santification', (error) => {
    if (error) {
        console.log(error);}
    console.log('The file has been saved!');
})

//(b)

fs.appendFile('./redemption.txt', '\nPilgrims Progress', (error) => {
    if (error) {
        console.log(error);}
    console.log('The file has been updated!');
})
//(c)
fs.readFile('./redemption.txt', 'utf8', (error, data) => {
    if (error) {
        console.log(error);}
    const allTexts = data.split('\n');
    const lastText = allTexts[allTexts.length - 1];
    fs.writeFile('./redemption.txt', lastText, (error) => {
        if (error) {
            console.log(error);}
        console.log('The file has been updated!');
    })
})

const displayDateTime = require('./showTime');
displayDateTime()