const http = require("http");
const url = require("url");
const fs = require("fs");
http
  .createServer((req, res) => {
    let reqUrl = url.parse(req.url, { recursive: true });
    console.log(reqUrl.query.id);

    if (reqUrl.pathname == "/students") {
      let data = JSON.parse(fs.readFileSync("./students.json", "utf-8"));

      let responsedata = reqUrl.query.id
        ? data.filter((item) => item.id == +reqUrl.query.id)
        : data;
      res.writeHead(201, { "content-type": "application/json" });
      res.write(
        JSON.stringify({
          count: responsedata.length,
          students: responsedata,
        })
      );
      res.end();
    } else if (reqUrl.pathname == "/time") {
      res.writeHead(201, { "content-type": "application/json" });
      let now = new Date();
      res.write(
        JSON.stringify({
          time: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        })
      );
      res.end();
    } else if (reqUrl.pathname == "/files") {
      //   console.log();

      res.writeHead(201, { "content-type": "application/json" });

      res.write(JSON.stringify({ files: fs.readdirSync("./data") }));
      res.end();
    } else {
      res.writeHead(404);
      res.write("Not Found");
      res.end();
    }
  })
  .listen(8000);
