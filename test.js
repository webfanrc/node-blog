var http = require("http");
var url = require("url");
var mysql = require('mysql');

http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var arg = url.parse(request.url, true).query;
  console.log('pathname:' + pathname);
  // console.log('arg:' + JSON.stringify(arg));

  response.setHeader("Access-Control-Allow-Origin","http://localhost:8081");
  response.setHeader("Access-Control-Allow-Headers","Content-Type");
  response.writeHead(200, {'Content-Type': 'text/plain'});

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'test'
  });
  connection.connect();

  if (pathname == "/blog") {

    var sql = 'select * from blog order by create_date DESC';
    connection.query(sql, function(error, results) {
      console.log(results);
      response.write(JSON.stringify(results));
      response.end();
    });

  } else if (pathname = "/blog/detail") {
    var title = arg.title;
    var sql = `select * from blog where title = '${title}'`;
    console.log(sql);
    connection.query(sql, function(error, results) {
      console.log(results);
      response.write(JSON.stringify(results));
      response.end();
    });
  }

}).listen(8888);