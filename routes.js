const fs = require("fs");

const requestHandler = (req, res) => {
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
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "some hard coded text",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "some hard coded text";

exports.handler = requestHandler;
exports.someText = "some hard coded text";
