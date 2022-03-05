import express from "express";
import { globalRouter } from "./router/global.router";
import { createDatabaseConnection } from "./util/createDatabaseConnection";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const port = 4000;

export const startServer = async () => {
  const dbConnection = await createDatabaseConnection();
  const app = express();

  // In order to send the body of a post request in json, express needs to parse it with use bodyParser.
  // bodyParser is a middleware that is used globally by injecting it via app.use in all app functions.
  app.use(bodyParser.json());

  // Here the cors is set, so the browser doesn't deny communication.
  app.use(cors());

  // morgan is a middleware function that logs the time, globally, no matter which path is chosen.
  app.use(morgan("combined"));

  app.use("/api", globalRouter);

  /**
   * Server functionality: listens to given port (i.e. port:4000).
   */
  const server = app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });

  return { server, dbConnection };
};

startServer();
