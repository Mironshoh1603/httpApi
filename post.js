const fs = require("fs");
let getAllPosts = (req, respncha) => {
  let posts = fs.readFileSync("./posts.json", "utf8");
  // console.log(posts.length);
  respncha.writeHead(200, { "content-type": "application/json" });
  respncha.write(posts);
  respncha.end();
};

module.exports = { getAllPosts };
