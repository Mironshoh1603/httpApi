const http = require("http");
const fs = require("fs");
const { getAllPosts } = require("./post.js");
const { getAllCommnets, deleteComment } = require("./commnets.js");

let server = http.createServer((rekuest, respncha) => {
  console.log(rekuest.method, rekuest.url);
  if (rekuest.method == "GET" && rekuest.url == "/posts")
    getAllPosts(rekuest, respncha);
  else if (rekuest.url.startsWith("/comments")) {
    if (rekuest.method == "GET") getAllCommnets(rekuest, respncha);
    if (rekuest.method == "DELETE") deleteComment(rekuest, respncha);
    if (rekuest.method == "POST") {
      let body = "";
      rekuest.on("data", (chunk) => {
        console.log(chunk);
        body += chunk;
      });
      rekuest.on("end", () => {
        let data = JSON.parse(body);
        data.id = Math.floor(Math.random() * 100 + 100);
        console.log(data);
        let comments = JSON.parse(fs.readFileSync("./comments.json", "utf-8"));
        comments.push(data);
        fs.writeFileSync("./comments.json", JSON.stringify(comments), "utf-8");
        respncha.writeHead(200, { "content-type": "application/json" });
        respncha.write(
          JSON.stringify({
            message: "Succes",
            data: data,
          })
        );
        respncha.end();
      });
    }
  } else {
    respncha.write("Serverbek");
    respncha.end();
  }
});

server.listen(8000);
