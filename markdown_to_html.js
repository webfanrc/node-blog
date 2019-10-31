var markdown = require('markdown-it');
var fs = require("fs");

var data = fs.readFileSync("test.js");

console.log(data.toString());



var md = new markdown();

var result = md.render('# asdas!');

console.log(result);