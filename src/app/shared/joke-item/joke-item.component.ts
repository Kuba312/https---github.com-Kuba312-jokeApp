import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { removeJoke } from 'src/app/jokes/state/jokes.actions';
import { AppState } from 'src/app/reducers/app.reducer';
import { RemoveJokeConfirmComponent } from '../remove-joke-confirm/remove-joke-confirm.component';
import { AppMessageService } from '../services/app-message.service';

@Component({
  selector: 'app-joke-item',
  templateUrl: './joke-item.component.html',
  styleUrls: ['./joke-item.component.scss']
})
export class JokeItemComponent implements OnDestroy {

  @Input() myJokes: boolean = false;
  @Input() id: string;

  subscription: Subscription;

  constructor(private readonly store: Store<AppState>,
    private dialog: MatDialog,
    private readonly appMessageService: AppMessageService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeJoke() {
    const dialogRef = this.dialog.open(RemoveJokeConfirmComponent);
    this.subscription = dialogRef.afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(removeJoke({ id: this.id }));
          this.appMessageService.openMessageBar('Żart został pomyślnie usunięty', 'success');
        }
      })
  }


}
