const express = require("express");
const app = express();
const portNumber = 3000;
const sourceDir = "/Users/feizheng/github/javascript-notes/src/2019-10/2019-10-22";

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
