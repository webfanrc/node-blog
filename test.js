const http = require("http");
const url = require("url");
const mysql = require('mysql');
const os = require('os');

http.createServer(function(request, response) {
  request.setEncoding('utf8');

  var pathname = url.parse(request.url).pathname;
  var arg = url.parse(request.url, true).query;
  console.log('pathname: ' + pathname);

  response.setHeader("Access-Control-Allow-Origin","http://localhost:8081"); // 方便本地调试（vue项目的dev端口必须为8081）
  response.setHeader("Access-Control-Allow-Headers","Content-Type");
  response.writeHead(200, {'Content-Type': 'text/plain'});

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'test'
  });
  connection.connect();

  if (pathname == "/blog/") { // 获取文章列表以及用户IP todo: 分成两个接口

    let yourOS = os.platform();
    let yourHost = os.hostname();
    let yourIP = request.headers['x-forwarded-for'] || request.connection.remoteAddress; //需要在nginx上进行配置

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
  } else if (pathname == "/blog/sendMessage") { // todo: 修改为post形式
    console.log(arg);
    let sql = `INSERT INTO message (user_message, user_name, user_email, user_website, send_date, message_for) 
    values
    ('${arg.user_message}', '${arg.user_name}', '${arg.user_email}', '${arg.user_website}', NOW(), '${arg.message_for}')`;

    // console.log(sql);
    connection.query(sql, function(err, res) {
      // console.log(res);
      if (typeof res != "undefined") {
        response.write(JSON.stringify(res));
      } else {
        response.write(JSON.stringify(0));
      }
      response.end();
    });
  } else if (pathname == "/blog/getMessages") {
    let sql = `select id, user_name, user_message, user_website, DATE_FORMAT(send_date, \'%Y-%m-%d %H:%i:%s\') as date from message where message_for='${arg.message_for}'`;
    console.log(sql);
    connection.query(sql, function(error, res) {
      if (typeof res != 'undefined') {
        response.write(JSON.stringify(res));
      }
      response.end();
    });

  } else if (pathname == "/blog/ipAddress") {
    let user_ip = arg.user_ip;
    let view_title = arg.view_title;
    let view_date = new Date();

    connection.query('INSERT INTO ip SET ?', {
      user_ip: user_ip,
      view_title: view_title,
      view_date: view_date,
    }, function(error, results) {
      console.log(typeof results);
      if (typeof results != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    })
  } else if (pathname == "/blog/ipFilter") { // 判断这个ip今天是否访问过这个页面，如果是则返回true，不是则返回false
    let user_ip = arg.user_ip;
    let view_title = arg.view_title;
    let view_date = new Date();

    let formate_view_date = view_date.getFullYear() + '-' + (view_date.getMonth() + 1) + '-' + view_date.getDate();

    let sql = `select * from ip where user_ip='${user_ip}' and view_title='${view_title}' and date_format(view_date, '%Y-%m-%d')='${formate_view_date}'`;

    connection.query(sql, function(error, res) {
      if (typeof res != 'undefined') {
        if (res.length != 0) {
          response.write('true');
        } else {
          response.write('false');
        }
      }
      response.end();
    })

  } else if (pathname == "/blog/getUserIP") {
    let sql = 'select * from ip order by view_date DESC';
    connection.query(sql, function(error, res) {
      let results = {};
      results.ipList = res;
      if (typeof res != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });
  } else if (pathname == "/blog/getUserIPFormat") {
    let sql = `select date_format(view_date, '%Y-%m-%d') date, count(*) count from ip group by date_format(view_date, '%Y-%m-%d');`;
    connection.query(sql, function(error, res) {
      let results = {};
      results.ipListFormat = res;
      if (typeof res != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });
  } else if (pathname == "/blog/getArticleFormat") {
    let sql = `select date_format(create_date, '%Y-%m') as date, count(*) as count from blog group by date ORDER BY date;`;
    connection.query(sql, function(error, res) {
      let results = {};
      results.articleListFormat = res;
      if (typeof res != 'undefined') {
        response.write(JSON.stringify(results));
      }
      response.end();
    });

  }

}).listen(8888);