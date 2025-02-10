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
const routes = require("./routes");
// require either takes a path to another file(e.g. ur own JS files - imports of these start with './' or '/') or you can use a core module from one of the "CORE MODULE".

console.log(routes.someText);

// how to create an http server...
const server = http.createServer(routes.handler);
//   console.log(req.url, req.method, req.headers);
//   process.exit();

server.listen(8000);

// single thread, event loop, and blocking code...
