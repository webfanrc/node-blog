var markdown = require('markdown-it');
var fs = require("fs");
var path = require('path');
var md = new markdown();


const PATH = "./posts";
let files = fs.readdirSync(PATH);
let final_output = 'SET NAMES utf8;\n' +
  'SET FOREIGN_KEY_CHECKS = 0;' +
  'BEGIN;' +
  'INSERT INTO `blog` (title, content, create_date) VALUES ';

files.forEach(function(element, index){
  // if (index == 0) {
    var data = fs.readFileSync(path.join(PATH, element)).toString();
    var data_info = data.split("---");
    var article_post = '-'; // 目前没有这个功能
    var article_title = data_info[1].split('\n')[2].split(': ')[1];
    var article_date_arr = element.split('-');
    var article_date = article_date_arr[0] + '-' + article_date_arr[1] + '-' + article_date_arr[2];
    var article_md = data_info[2];


    var article_html = md.render(article_md);
    var article_html_norn = article_html
      .replace(/[\r\n]/g, "")
      .replace(/[']/g, "\\\'");

    final_output += `('${article_title}', '${article_html_norn}', '${article_date}')`;

    if (index != (files.length - 1)) {
      final_output += ',';
    } else {
      final_output += ';';
    }
  // }
});

final_output+= 'COMMIT; SET FOREIGN_KEY_CHECKS = 1;';

fs.writeFile('output.sql', final_output, function(err) {
  console.log('1');
});
