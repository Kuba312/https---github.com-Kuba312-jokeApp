import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JokesState } from "./reducers/jokes.reducer";
import * as fromJokes from "./reducers/jokes.reducer"

export const selectJokesState = createFeatureSelector<JokesState>("jokes");


export const selectAllJokes = createSelector(
    selectJokesState,
    fromJokes.selectAll
)

export const areJokesLoaded = createSelector(
    selectJokesState,
    state => state.allJokesLoaded
)