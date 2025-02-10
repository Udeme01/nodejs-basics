// const fs = require("fs");
// const path = require("path");

// fs.writeFileSync("output.txt", "node file hello"); // writing output to a file - using the file system function()

// console.log("hello world"); // instead of the console...

// CORE MODULES
// http - helps in launching a server, send requests
// https - Launch a SSL server
// fs
// path
// os

const http = require("http");
const fs = require("fs");
// require either takes a path to another file(e.g. ur own JS files - imports of these start with './' or '/') or you can use a core module from one of the "CORE MODULE".

// how to create an http server...
const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method, req.headers);
  //   process.exit();

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk of data", chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody", parsedBody);
      const message = parsedBody.split("=")[1];
      console.log("message", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // how to send a response backk to client..
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first nodejs page</title></head>");
  res.write("<body><h1>Hello to my nodejs server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(8000);
