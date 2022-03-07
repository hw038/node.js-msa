var http = require('http');
var fs = require('fs');
var url = require('url');



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(queryData.id);
    // if (queryData.name) {
    //   // user told us their name in the GET request, ex: http://host:8000/?name=Tom
    //   response.end('Hello ' + queryData.name + '\n');
  
    // } else {
    //   response.end("Hello World\n");
    // }
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(queryData.id);
 
});
app.listen(3000);