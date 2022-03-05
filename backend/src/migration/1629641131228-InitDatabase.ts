import { MigrationInterface, QueryRunner } from "typeorm";
import { Joke } from "../entity/joke.model";
import { getExternalJokeApi } from "../util/initDatabase";

export class InitDatabase1629641131228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let externalJokes = [];
    for (let i = 0; i < 100; i++) {
      externalJokes.push(getExternalJokeApi());
    }
    const jokes = await Promise.all(externalJokes);
    await queryRunner.connection.getRepository(Joke).save(jokes);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(Joke).clear();
  }
}
