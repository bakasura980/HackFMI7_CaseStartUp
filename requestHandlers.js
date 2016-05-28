
var exec = require("child_process").exec;
var execSync = require('sync-exec');
var querystring = require("querystring");
var fs = require('fs');
var fileSystem = require('path');
var stlviewie = require('stl-obj-viewer');

function start(response, postData){
  console.log("Start Handlers :D");

  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post">'+
  '<textarea name="text" rows="20" cols="60"></textarea>'+
  '<input type="submit" value="Submit text" />'+
  '</form>'+
  '</body>'+
  '</html>';


    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body );
    response.end();

}

function Replace(result){

}

function PrintIphone(name, pattern_shape,pattern_stencil, onshape, onstencil, radius, overlap, rotation, thickness){

  fs.readFile("IPhone_new_edition.scad", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var name_replace = data.replace("phone_model = 3;", "phone_model = " + name + ";");
    var radius_replace = name_replace.replace("pattern_element_radius = 8;", "pattern_element_radius = " + radius + ";");
    var overlap_replace = radius_replace.replace("pattern_element_overlap = 0;", "pattern_element_overlap = " + overlap + ";");
    var rotation_replace = overlap_replace.replace("pattern_element_rotation = 0;", "pattern_element_rotation = " + rotation + ";");
    var thickness_replace = rotation_replace.replace("pattern_line_thickness = 20;", "pattern_line_thickness = " + thickness + ";");
    var shape_replace = thickness_replace.replace("pattern_element_shape = 3;", "pattern_element_shape = " + pattern_shape + ";");
    var stencil_replace = shape_replace.replace("stencil_shape = 4;", "stencil_shape = " + pattern_stencil + ";");
    var onshape_replace = stencil_replace.replace("use_pattern = 1;", "use_pattern = " + onshape + ";");
    var onstencil_replace = onshape_replace.replace("use_stencil = 1;", "use_stencil = " + onstencil + ";");
    fs.writeFile("IPhoneReplacing.scad", onstencil_replace, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });

  execSync('openscad -o IPhone1.png IPhoneReplacing.scad');

}

function upload(response, postData){
  console.log("Upload Handlers :D");
  //response.writeHead(200, {"Content-Type": "text/plain"});
  var jsonparser = JSON.parse(querystring.parse(postData).text);
  PrintIphone(jsonparser.name,jsonparser.pattern_shape,jsonparser.pattern_stencil, jsonparser.onshape, jsonparser.onstencil,
    jsonparser.radius, jsonparser.overlap, jsonparser.rotation, jsonparser.thickness);
  console.log(jsonparser.name);

  //var img = fs.readFileSync('IPhone.png');
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("/home/lubo/Desktop/IPhone.png");
  response.end();//(img, 'binary');
}


exports.start = start;
exports.upload = upload;
