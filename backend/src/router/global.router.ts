import { Router } from "express";
import { jokeRouter } from "./joke.router";

export const globalRouter = Router({ mergeParams: true });

interface helloGlobalApi {
  message: string;
}

/**
 * Greeting for otherwise empty home address.
 */
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello global api" } as helloGlobalApi);
});
/**
 * Path to all resources concerning jokes.
 */
globalRouter.use("/joke", jokeRouter);
