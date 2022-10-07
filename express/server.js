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

app.post("/messages", (req, res) => {
  res.send("updating messages");
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
