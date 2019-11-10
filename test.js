const http = require("http");
const url = require("url");
const mysql = require('mysql');
const os = require('os');

http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var arg = url.parse(request.url, true).query;
  console.log('pathname: ' + pathname);

  console.log('remoteAddress: ' + request.connection.remoteAddress);
  console.log('x-forwarded-for: ' + request.headers['x-forwarded-for']);
  console.log('x-real-ip: ' + request.headers['x-real-ip'] + '\n');

  response.setHeader("Access-Control-Allow-Origin","http://localhost:8081"); // 方便本地调试
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

    let yourOS = os.platform();
    let yourHost = os.hostname();
    let yourIP = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log(yourOS, yourHost, yourIP);

    let sql = 'select * from blog order by create_date DESC';
    connection.query(sql, function(error, res) {
      let results = {};
      results.blogList = res;

      results.yourOS = yourOS;
      results.yourHost = yourHost;
      results.yourIP = yourIP;

      if (typeof res != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });
  } else if (pathname == "/blog/detail") {
    var title = arg.title;
    var sql = `select * from blog where title = '${title}'`;
    connection.query(sql, function(error, results) {
      console.log('results of /blog/detail: ' + results);
      response.write(JSON.stringify(results));
      response.end();
    });
  } else if (pathname == "/sendMessage") {
    let user_name = arg.user_name;
    let user_email = arg.user_email;
    let user_message = arg.user_message;
    let sql = `insert into message(user_name, user_email, user_message) values('${user_name}', '${user_email}', '${user_message}')`;

    connection.query(sql, function(error, results) {
      console.log('results of /sendMessage: ' + results);
      if (typeof results != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });
  } else if (pathname == "/ipAddress") {
    let user_ip = arg.user_ip;
    let view_title = arg.view_title;
    let view_date = new Date();

    connection.query('INSERT INTO ip SET ?', {
      user_ip: user_ip,
      view_title: view_title,
      view_date: view_date,
    }, function(error, results) {
      if (typeof results != undefined) {
        response.write(JSON.stringify(results));
      }
      response.end();
    })
  } else if (pathname == "/getUserIP") {
    let sql = 'select * from ip order by view_date DESC';
    connection.query(sql, function(error, res) {
      let results = {};
      results.ipList = res;
      if (typeof res != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });
  }

}).listen(8888);