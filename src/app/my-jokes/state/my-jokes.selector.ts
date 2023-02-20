import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JokesState, selectAll } from "src/app/jokes/state/reducers/jokes.reducer";

export const selectJokesState = createFeatureSelector<JokesState>("jokes");


export const selectAllJokes = createSelector(
    selectJokesState,
    selectAll
)

export const selectAllMyJokes = createSelector(
    selectAllJokes,
    jokes => jokes.filter(jokes => jokes.myJoke)
)