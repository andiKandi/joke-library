import fetch from "node-fetch";
import { Joke } from "../entity/joke.model";

export const getExternalJokeApi = async (): Promise<Joke> => {
  const response = await fetch("https://v2.jokeapi.dev/joke/Any", {
    method: "GET",
  });
  const { category, joke, lang, type, setup, delivery } = await response.json();

  const newJoke = new Joke();
  newJoke.description = "... ... ...";

  if (type === "single") {
    const jokeTitleArray: string[] = joke.replace(/\n/gi, " ").split(" ");
    const jokeTitle: string = `${jokeTitleArray[0]} ${jokeTitleArray[1]} ${jokeTitleArray[2]}...`;
    newJoke.name = `${category}: ${jokeTitle}`;
    newJoke.description = joke.replace(/\n/gi, " ");
    newJoke.show = true;
    newJoke.counter = Math.floor(Math.random() * 100);
    newJoke.category = category;
    newJoke.language = lang;
  } else {
    const jokeTitleArray: string[] = setup.replace(/\n/gi, " ").split(" ");
    const jokeTitle: string = `${jokeTitleArray[0]} ${jokeTitleArray[1]} ${jokeTitleArray[2]}...`;
    newJoke.name = `${category}: ${jokeTitle}`;
    const jokeText1: string = setup.replace(/\n/gi, " ");
    const jokeText2: string = delivery.replace(/\n/gi, " ");
    newJoke.description = `${jokeText1} ${jokeText2}`;
    newJoke.show = true;
    newJoke.counter = Math.floor(Math.random() * 100);
    newJoke.category = category;
    newJoke.language = lang;
  }
  return newJoke;
};
