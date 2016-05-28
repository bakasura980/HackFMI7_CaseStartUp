var http = require("http");
var url = require("url");

function start(route, handle){
  function onRequest(request,response){
    postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received :D");

    request.setEncoding("utf8");
    //response.writeHead(200,{"Content-Type": "text/plain"});

    request.addListener("data", function(postDataChunk){
      postData += postDataChunk;
      console.log("Receiving POST data chunk" + postDataChunk);
    });
    //var content =

    request.addListener("end", function(){
      route(handle, pathname, response , postData);
    });

    //response.write(content);
    //response.end();
  }
  http.createServer(onRequest).listen(4444);
  console.log("Server Started...");
}


exports.start = start;
