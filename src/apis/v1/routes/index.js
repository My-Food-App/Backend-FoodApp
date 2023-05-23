const storeRouter = require("./store.routes");
const authRouter = require("./auth.routes");
const usersRouter = require("./users.routes");
const productRouter =  require("./product.routes")
const orderRouter = require("./order.routes")
const categoryRouter = require("./category.routes")
const paymentRoute = require("./payment.routes")
const notifiRoute = require("./notification.route")

function route(app) {
  const versionApi = (routeName) => `/api/v1/${routeName}`;

  app.use(versionApi("stores"), storeRouter);
  app.use(versionApi("auth"), authRouter);
  app.use(versionApi("users"), usersRouter);
  app.use(versionApi("products"),productRouter);
  app.use(versionApi("orders"),orderRouter);
  app.use(versionApi("categories"),categoryRouter);
  app.use(versionApi("payments"),paymentRoute);
  app.use(versionApi("notifications"),notifiRoute);

}

module.exports = route;
