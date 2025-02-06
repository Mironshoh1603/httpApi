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
  } else {
    respncha.write("Serverbek");
    respncha.end();
  }
});

server.listen(8000);
