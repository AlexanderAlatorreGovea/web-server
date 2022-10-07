const express = require("express");

const app = express();

const PORT = process.env.PORT || 8081;

const friends = [
  {
    id: 1,
    name: "alex",
  },
  {
    id: 2,
    name: "josh",
  },
];

//middleware
app.use((req, res, next) => {
  const start = Date.now();

  // without next, the response hangs
  next();

  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = +req.params.friendId;
  const friend = friends[friendId];

  if (!friend) {
    return res.status(404).json({
      error: "Friend does not exist",
    });
  }

  return res.status(200).json(friend);
});

app.get("/messages", (req, res) => {
  res.send("<ul><li>Hello Alex</li></ul>");
});

//middleware for json parsing
app.use(express.json());
app.post("/friends", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name",
    });
  }

  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };

  friends.push(newFriend);

  res.json(newFriend);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.use(function (req, res, next) {});
