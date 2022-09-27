import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

export default () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
      methods: "GET, HEAD, PUT, POST, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  app.set("port", process.env.APP_PORT);

  return app;
};
