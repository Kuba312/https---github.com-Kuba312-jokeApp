import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../reducers/app.reducer';
import { loadAllJokes } from './state/jokes.actions';
import { areJokesLoaded } from './state/jokes.selector';

@Injectable({ providedIn: 'root' })
export class JokesResolver implements Resolve<any> {

    loading: boolean = false;

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(areJokesLoaded),
                tap((areJokesLoaded) => {
                    if (!this.loading && !areJokesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllJokes());
                    }
                }),
                filter(jokesLoaded => !!jokesLoaded),
                first(),
                finalize(() => {
                    this.loading = false;
                })
            );
    }
}