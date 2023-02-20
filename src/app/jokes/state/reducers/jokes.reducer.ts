import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { JokeDto } from 'src/app/api/models/jokeDto';
import { JokesActions } from '../action-type';

export interface JokesState extends EntityState<JokeDto> {
    allJokesLoaded: boolean;
};


export const jokesAdpater = createEntityAdapter<JokeDto>();

const initialJokesState: JokesState = jokesAdpater.getInitialState({
    allJokesLoaded: false
});

export const jokesReducer = createReducer(
    initialJokesState,
    on(
        JokesActions.allJokesLoaded,
        (state, action) => jokesAdpater.addMany(
            action.jokes,
            {
                ...state,
                allJokesLoaded: true
            }
        ),
    ),
    on(
        JokesActions.addJoke,
        (state, action) => jokesAdpater.addOne(action.joke, state)
    ),
    on(
        JokesActions.removeJoke,
        (state, action) => jokesAdpater.removeOne(action.id, state)
    ),
);


export const { selectAll } = jokesAdpater.getSelectors();