import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { JokesEffects } from '../jokes/state/jokes.effects';
import { jokesReducer } from '../jokes/state/reducers/jokes.reducer';
import { SharedModule } from '../shared/shared.module';
import { MyJokesListComponent } from './my-jokes-list/my-jokes-list.component';



@NgModule({
    declarations: [MyJokesListComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: MyJokesListComponent }
        ]),
        MatCardModule,
        EffectsModule.forFeature([JokesEffects]),
        StoreModule.forFeature("jokes", jokesReducer)
    ],
    exports: [],
    providers: [],
})
export class MyJokesModule { }
