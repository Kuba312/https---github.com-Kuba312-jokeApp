import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { JokesApiService } from 'src/app/api/jokes-api.service';
import { JokesActions } from './action-type';
import { allJokesLoaded } from './jokes.actions';

@Injectable({
    providedIn: 'root'
})
export class JokesEffects {


    loadJokes$ = createEffect(
        () => this.actions$.pipe(
            ofType(JokesActions.loadAllJokes),
            concatMap(() => this.jokesApiService.getJokes()),
            map(jokes => allJokesLoaded({ jokes }))
        )
    )

    constructor(
        private actions$: Actions,
        private jokesApiService: JokesApiService) { }

}