import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JokeDto } from 'src/app/api/models/jokeDto';

@Component({
  selector: 'app-show-joke',
  templateUrl: './show-joke.component.html'
})
export class ShowJokeComponent {

  joke: JokeDto;

  constructor(@Inject(MAT_DIALOG_DATA) public jokeData: any) {
    this.joke = this.jokeData.joke
  }

}
