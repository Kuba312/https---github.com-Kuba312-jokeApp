import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { JokeDto } from 'src/app/api/models/jokeDto';
import { AppState } from 'src/app/reducers/app.reducer';
import { JokeAddComponent } from 'src/app/shared/joke-add/joke-add.component';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ShowJokeComponent } from 'src/app/shared/show-joke/show-joke.component';
import { selectAllMyJokes } from '../state/my-jokes.selector';

@Component({
  selector: 'app-my-jokes-list',
  templateUrl: './my-jokes-list.component.html',
  styleUrls: ['./my-jokes-list.component.scss']
})
export class MyJokesListComponent implements OnInit {


  myJokes$: Observable<JokeDto[]>;
  subscription: Subscription;

  constructor(private readonly store: Store<AppState>,
    private readonly dialog: MatDialog,
    private readonly appMessageService: AppMessageService) { }


  ngOnInit(): void {
    this.loadMyJokes();
  }


   loadMyJokes() {
    this.myJokes$ = this.store.pipe(
      select(selectAllMyJokes)
    );
  }

  showDetails(joke: JokeDto): void {
    this.dialog.open(ShowJokeComponent, {
      width: '550px',
      height: 'fit-content',
      data: {
        joke: joke
      }
    });
  };


  openAddDialog() {
    const dialogRef = this.dialog.open(JokeAddComponent, {
      width: '550px',
      height: '520px'
    });
    this.subscription = dialogRef.afterClosed().subscribe((joke) => {
      if (joke) {
        this.appMessageService.openMessageBar('Żart został pomyślnie dodany', 'success');
        this.loadMyJokes();
      }
    })
  }

}
