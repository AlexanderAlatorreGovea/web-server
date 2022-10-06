const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/friends") {
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });

    res.end(
      JSON.stringify({
        message: "alex",
      })
    );
  } else if (req.url === "/messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<li>Hello there</li>");
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
