const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

// views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});
app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "My Friends Are VERYY Clever",
    caption: "Let's go skiing!",
  });
});

// routes
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

// listening on port
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
