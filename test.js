var http = require("http");
var url = require("url");
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log('pathname:' + pathname);
  if (pathname == "/blog") {
    response.setHeader("Access-Control-Allow-Origin","http://localhost:8081");
    response.setHeader("Access-Control-Allow-Headers","Content-Type");
    response.writeHead(200, {'Content-Type': 'text/plain'});

    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'test'
    });

    connection.connect();
    connection.query('select 2 as solution', function(error, results) {
      console.log(results[0].solution);
    });


    var sql = 'select * from blog';
    connection.query(sql, function(error, results) {
      console.log(results);
      response.write(JSON.stringify(results));
      response.end();
    });
  }
}).listen(8888);