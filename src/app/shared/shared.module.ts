import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JokeAddComponent } from './joke-add/joke-add.component';
import { JokeItemComponent } from './joke-item/joke-item.component';
import { CategoryDataPipe } from './pipes/category.pipe';
import { ShowJokeComponent } from './show-joke/show-joke.component';
import { RemoveJokeConfirmComponent } from './remove-joke-confirm/remove-joke-confirm.component';

export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MAT_MDC_DIALOG_DATA');


@NgModule({
    declarations: [
        JokeItemComponent,
        JokeAddComponent,
        ShowJokeComponent,
        CategoryDataPipe,
        RemoveJokeConfirmComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatButtonModule
    ],
    exports: [
        CategoryDataPipe,
        JokeItemComponent,
        JokeAddComponent,
        CommonModule,
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatButtonModule
    ],
    providers: [
        
    ],
})
export class SharedModule { }
