import { Router } from "express";
import {
  createJoke,
  updateJoke,
  deleteJoke,
  getAllJokes,
  getJoke,
} from "../controller/joke.controller";

export const jokeRouter = Router({ mergeParams: true });

/**
 * Gets all jokes that are in DB.
 */
jokeRouter.get("/", getAllJokes);
/**
 * Gets one specific joke by ID from DB.
 */
jokeRouter.get("/:id", getJoke);
/**
 * Posts/creates one joke to the DB.
 */
jokeRouter.post("/", createJoke);
/**
 * Deletes one specific joke by ID from DB.
 */
jokeRouter.delete("/:id", deleteJoke);
/**
 * Changes one specific joke by ID in DB.
 */
jokeRouter.put("/:id", updateJoke);
