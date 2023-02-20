import { createAction, props } from "@ngrx/store";
import { JokeDto } from "src/app/api/models/jokeDto";

export const loadAllJokes = createAction(
    '[Jokes Resolver] Load All Jokes'
)

export const allJokesLoaded = createAction(
    '[Load Jokes Effect] All Jokes Loaded',
     props<{jokes: JokeDto[]}>()
)

export const addJoke = createAction(
    '[Create Joke Form] Add Joke',
    props<{joke: JokeDto}>()
)


export const removeJoke = createAction(
    '[My Joke List] Remove Joke',
    props<{id: string}>()
)