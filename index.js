const express = require("express");
const fs = require("fs"); // file accessing package
const path = require("path");

const app = express();

app.use(express.static("timestamps"));

const dirPath = path.join(__dirname, "timestamps"); //path

app.get("/", (req, res) => {
  let time = new Date(); //toget date with timestamp
  let dateString = time.toUTCString().slice(0, -4); // to change linux to UTC
  let content = `Last updated timestamp is : ${dateString}`;

  let file = dateString.replaceAll(":", "-").replaceAll(",", "-");

  fs.writeFileSync(`${dirPath}/${file}.txt`, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file created successfullt");
    }
  });

  res.sendFile(path.join(__dirname, `timestamps/${file}.txt`));
});

app.get("/read", (req, res) => {
  fs.readdir(`${dirPath}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(dirPath);
      data.forEach((file) => {
        console.log(file);
      });
      console.log(data);
    }
    res.send(JSON.stringify({ TimeStamp_File: data }));
  });
});

//server listening under this port
app.listen(9000, () => console.log(`App is listening`));
