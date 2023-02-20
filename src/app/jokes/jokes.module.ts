import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { JokeItemComponent } from '../shared/joke-item/joke-item.component';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import { JokesResolver } from './jokes.resolver';
import { JokesEffects } from './state/jokes.effects';
import { jokesReducer } from './state/reducers/jokes.reducer';
import { JokeAddComponent } from '../shared/joke-add/joke-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowJokeComponent } from '../shared/show-joke/show-joke.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [JokesListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { 
                path: '', 
                component: JokesListComponent,
                resolve: {
                    jokes: JokesResolver
                }
            }
        ]),
        SharedModule,
        EffectsModule.forFeature([JokesEffects]),
        StoreModule.forFeature("jokes", jokesReducer),
        MatDialogModule
    ],
    exports: [],
    providers: [
        MatSnackBar
    ]
})
export class JokesModule { }
