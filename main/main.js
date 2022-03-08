var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
const sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    var list = '';
    if(pathname === '/'){
        if(queryData.id === undefined){
          fs.readdir('./data', function(err, filelist){
          
            title = 'Welcome';
            description = 'Hello, Node.js';
           
            var list = template.list(filelist);
            var html = template.html(title, list, `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
          });
        }else{
          fs.readdir('./data', function(err, filelist){
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
              var title = queryData.id;
              var sanitizedTitle = sanitizeHtml(title);
              var sanitizedDescription = sanitizeHtml(description);
              var list = template.list(filelist);
              var html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
              );
              response.writeHead(200);
              response.end(html);
            });
          });
        }
          
    }else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form 
          action="/create_process" method="post">
          <p><input type="txt" name="title"
          placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>`, ''
        );
          response.writeHead(200);
          response.end(html);
      })
    }else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form 
          action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="txt" name="title" placeholder="title" value="${title}">
          </p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>`, ''
        );
          response.writeHead(200);
          response.end(html);
        });
      })
    }else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8',
        function(err){
          response.writeHead(200);
          response.end('success');
        })
      });
    }else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        })        
      });
    }else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.access(`data/${filteredId}`, fs.constants.F_OK, (err) => { // A
          if (err) {
            console.log('삭제할 수 없는 파일입니다');
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(`data/${id} 삭제할 수 없는 파일입니다`);
          }else{
            fs.unlink(`data/${id}`, (err) => err ?  
            console.log(err) : console.log(`data/${id} 를 정상적으로 삭제했습니다`));
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(`data/${id} 를 정상적으로 삭제했습니다`);
          } 
          });
      });
    }else{
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);