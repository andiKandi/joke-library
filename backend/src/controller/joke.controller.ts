import { RequestHandler } from "express";
import { Joke } from "../entity/joke.model";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { createObjectCsvStringifier } from "csv-writer";

type GetAllJokesResponseBody = {
  jokes: Joke[];
};

type GetJokeResponseBody = {
  joke: Joke;
};

type CreateJokeResponseBody = {
  createdJoke: Joke;
};

type CreateJokeRequestBody = Omit<Joke, "id">;

type UpdateJokeResponseBody = {
  createdTask: Joke;
};

type UpdateJokeRequestBody = Partial<Omit<Joke, "id">>;

/**
 * Gets all jokes that are in DB.
 */
export const getAllJokes: RequestHandler<{}, GetAllJokesResponseBody | string> =
  async (req, res) => {
    const jokesRepository = await getRepository(Joke);
    const { type, counter, limit, show, category, language } = req.query;

    // query builder
    let initialQuery = jokesRepository.createQueryBuilder().select("Joke");
    if (Object.keys(req.query).length > 0) {
      if (category !== undefined) {
        initialQuery = initialQuery.andWhere("Joke.category = :category", {
          category,
        });
      }
      if (show !== undefined) {
        initialQuery = initialQuery.andWhere("Joke.show = :show", {
          show: show === "true",
        });
      }
      if (counter !== undefined && type === "gte") {
        initialQuery = initialQuery.andWhere("Joke.counter >= :counter", {
          counter,
        });
      }
      if (counter !== undefined && type === "lte") {
        initialQuery = initialQuery.andWhere("Joke.counter <= :counter", {
          counter,
        });
      }
      if (limit !== undefined) {
        if (Number(limit) < 0) {
          initialQuery = initialQuery.limit(Number(limit) * -1);
        } else {
          initialQuery = initialQuery.limit(Number(limit));
        }
      }
      if (language !== undefined) {
        initialQuery = initialQuery.andWhere("Joke.language = :language", {
          language,
        });
      }
    }
    const jokes = await initialQuery.getMany();

    // check query for csv request in header
    if (req.header("Accept") === "text/csv") {
      const csvWriter = createObjectCsvStringifier({
        header: [
          { id: "id", title: "ID" },
          { id: "name", title: "NAME" },
          { id: "description", title: "DESCRIPTION" },
          { id: "createdAt", title: "CREATEDAT" },
          { id: "updatedAt", title: "UPDATEDAT" },
          { id: "show", title: "SHOW" },
          { id: "counter", title: "COUNTER" },
          { id: "category", title: "CATEGORY" },
          { id: "language", title: "LANGUAGE" },
        ],
      });
      res.header("Content-Type", "text/csv");
      res.send(csvWriter.getHeaderString() + csvWriter.stringifyRecords(jokes));
    } else {
      res.send({
        jokes: jokes,
      });
    }
  };

/**
 * Gets one specific joke by ID from DB.
 */
export const getJoke: RequestHandler<{ id: string }, GetJokeResponseBody> =
  async (req, res) => {
    const jokeId = req.params.id;
    const jokesRepository = await getRepository(Joke);

    try {
      const joke = await jokesRepository.findOneOrFail(jokeId);
      res.send({
        joke: joke,
      });
    } catch (e) {
      res.status(404).send();
    }
  };

/**
 * Changes one specific joke in DB.
 */
export const updateJoke: RequestHandler<
  { id: string },
  UpdateJokeResponseBody,
  UpdateJokeRequestBody
> = async (req, res) => {
  const jokeId = req.params.id;
  const { name, description, show, counter, category, language } = req.body;

  const jokesRepository = await getRepository(Joke);

  try {
    let joke = await jokesRepository.findOneOrFail(jokeId);
    if (name !== undefined) joke.name = name!;
    if (description !== undefined) joke.description = description!;
    if (show !== undefined) joke.show = show!;
    if (counter !== undefined) joke.counter = counter!;
    if (category !== undefined) joke.category = category!;
    if (language !== undefined) joke.language = language!;

    joke = await jokesRepository.save(joke);

    res.send({
      createdTask: joke,
    });
  } catch (e) {
    res.status(404).send();
  }
};

/**
 * Creates a Joke object and returns it in the response
 */
export const createJoke: RequestHandler<
  {},
  CreateJokeResponseBody,
  CreateJokeRequestBody
> = async (req, res) => {
  const { name, description, show, counter, category, language } = req.body;

  let joke = new Joke();
  joke.name = name;
  joke.description = description;
  joke.show = show;
  joke.counter = Number(counter);
  joke.category = category;
  joke.language = language;

  const errors = await validate(joke, { skipMissingProperties: true });
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).send();
  }

  const jokesRepository = await getRepository(Joke);

  const createdJoke: Joke = await jokesRepository.save(joke);

  res.status(201).send({ createdJoke });
};

/**
 * Deletes one specific joke by ID from DB.
 */
export const deleteJoke: RequestHandler<{ id: string }, {}> = async (
  req,
  res
) => {
  const jokeId = req.params.id;
  const jokesRepository = await getRepository(Joke);

  try {
    const joke = await jokesRepository.findOneOrFail(jokeId);
    await jokesRepository.remove(joke);
    res.send({
      data: `Joke deleted: ${joke.name}`,
    });
  } catch (e) {
    res.status(404).send({
      status: "not_found",
    });
  }
};
