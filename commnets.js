const fs = require("fs");
let getAllCommnets = (req, respncha) => {
  let comments = JSON.parse(fs.readFileSync("./comments.json", "utf-8"));
  let urlArr = req.url.split("/");
  console.log(urlArr);
  respncha.writeHead(200, { "content-type": "application/json" });
  if (urlArr.length <= 2) {
    respncha.write(JSON.stringify(comments));
  } else {
    respncha.write(
      JSON.stringify(comments[+urlArr[2] - 1] ? comments[+urlArr[2] - 1] : null)
    );
  }

  respncha.end();
};
let deleteComment = (req, res) => {
  let comments = JSON.parse(fs.readFileSync("./comments.json", "utf-8"));
  let urlArr = req.url.split("/");
  console.log(+urlArr[2]);
  comments = comments.filter((ele) => ele.id !== +urlArr[2]);
  fs.writeFileSync("./comments.json", JSON.stringify(comments), "utf8");
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(comments));
  res.end();
};

let addData = (req, res) => {};
module.exports = { getAllCommnets, deleteComment, addData };
