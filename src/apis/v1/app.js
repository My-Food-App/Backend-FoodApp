const { app, database, config, body_parser } = require("./load");
database();
app.use(body_parser.json({ limit: "50mb" }));
app.use(body_parser.urlencoded({ limit: "50mb", extended: true }));

// socket
var server = require("http").Server(app);
var io = require("socket.io")(server);

//

const route = require("./routes/index");
route(app);

app.use(function (req, res, next) {
  res.status(404).send(new Error("Not Found"));
});

server.listen(config.PORT, function (err) {
  if (!err) {
    console.log(
      `Server running in ${config.ENV} mode on port ${config.PORT} - http://localhost:${config.PORT}`
    );
  } else {
    console.log("Sever run fail");
  }
});

io.on("connection", function (socket) {
  console.log("socket", socket.id);

  socket.on("ADD_ITEM_INTO_CART", function () {
    socket.emit("LOAD_CART");
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});
