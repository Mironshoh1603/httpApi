const fs = require("fs");

if (fs.existsSync("./data/notes.txt")) {
  let text = fs.readFileSync("./data/notes.txt", "utf-8");
  console.log(text);
  text += `\t4. MongoDB bilan ishlash`;
  fs.writeFileSync("./data/notes.txt", text, "utf-8");
} else {
  fs.writeFileSync(
    "./data/notes.txt",
    `1. JavaScript asoslari
2. Node.js modullari
3. Express.js framework`,
    "utf8"
  );
}
