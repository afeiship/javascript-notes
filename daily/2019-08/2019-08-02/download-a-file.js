const express = require("express");
const app = express();
const portNumber = 3000;
const sourceDir = "src";
var path = require("path");
var mime = require("mime");
var fs = require("fs");

app.use(express.static(sourceDir));
app.get("/download", function(req, res) {
  var file = __dirname + "/test.txt";
  var filename = path.basename(file);
  var mimetype = mime.lookup(file);
  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
