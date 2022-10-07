const http = require("http");

const friends = [
  {
    id: 0,
    name: "alex",
  },
  {
    id: 1,
    name: "jose",
  },
  {
    id: 2,
    name: "raul",
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    
    req.pipe(res);
  }

  if (req.method === "GET" && items[1] === "friends") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    if (items.length === 3) {
      const friendsIndex = +items[2];
      console.log({ friendsIndex });
      res.end(JSON.stringify(friends[friendsIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "/messages") {
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
