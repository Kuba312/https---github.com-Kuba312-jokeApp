import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { JokeDto } from 'src/app/api/models/jokeDto';
import { AppState } from 'src/app/reducers/app.reducer';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { JokeAddComponent } from '../../shared/joke-add/joke-add.component';
import { ShowJokeComponent } from '../../shared/show-joke/show-joke.component';
import { selectAllJokes } from '../state/jokes.selector';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html'
})
export class JokesListComponent implements OnInit {


  @ViewChildren('slide') slides: QueryList<ElementRef>;

  jokes$: Observable<JokeDto[]>;
  jokeIndex: number = 1;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private appMessageService: AppMessageService,) { }

  ngOnInit(): void {
    this.loadJokes();
  }

  private loadJokes(): void {
    this.jokes$ = this.store.pipe(select(selectAllJokes));
  }

  onNext() {
    this.jokeIndex++;
    if (this.jokeIndex > this.slides.length) this.jokeIndex = 1;
    this.slides.forEach((slide: ElementRef, i) => {
      this.renderer.setStyle(slide.nativeElement, 'transform', `translateX(${((i + 1) - this.jokeIndex) * 100}%)`)
    })
  }

  onPrevious() {
    this.jokeIndex--;
    if (this.jokeIndex < 1) this.jokeIndex = this.slides.length;
    this.slides.forEach((slide: ElementRef, i) => {
      this.renderer.setStyle(slide.nativeElement, 'transform', `translateX(${((i + 1) - this.jokeIndex) * 100}%)`)
    })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(JokeAddComponent, {
      width: '550px',
      height: '520px'
    });
    this.subscription = dialogRef.afterClosed().subscribe((joke) => {
      if (joke) {
        this.appMessageService.openMessageBar('Żart został pomyślnie dodany', 'success');
        this.loadJokes();
      }
    })
  };

  showDetails(joke: JokeDto): void {
    this.dialog.open(ShowJokeComponent, {
      width: '550px',
      height: 'fit-content',
      data: {
        joke: joke
      }
    });
  };

}


