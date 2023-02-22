import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesApiService } from 'src/app/api/categories-api.service';
import { CategoryDto } from 'src/app/api/models/categoryDto';
import { AppState } from 'src/app/reducers/app.reducer';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { validateForm } from 'src/app/shared/utils/form-model.utils';
import { addJoke } from '../../jokes/state/jokes.actions';
import { JokeAddFormModel } from './joke-add.form-model';

@Component({
  selector: 'app-joke-add',
  templateUrl: './joke-add.component.html'
})
export class JokeAddComponent implements OnInit {

  categories$: Observable<CategoryDto[]>;

  formModel: JokeAddFormModel;

  constructor(
    private categoriesApiService: CategoriesApiService,
    private appMessageService: AppMessageService,
    private dialogRef: MatDialogRef<JokeAddComponent>,
    private store: Store<AppState>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.formModel = new JokeAddFormModel();
    this.categories$ = this.categoriesApiService.getCategories();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveJoke() {
    validateForm(this.formModel.formGroup);
    if (this.formModel.formGroup.invalid) {
      this.appMessageService.openMessageBar('Formularz zawiera błędy', 'warning');
      return;
    }

    const joke = this.formModel.toModel();
    this.store.dispatch(addJoke({ joke }))
    this.dialogRef.close(joke);
  }

}
