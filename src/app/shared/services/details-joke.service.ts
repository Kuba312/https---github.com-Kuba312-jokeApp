import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { JokeDto } from 'src/app/api/models/jokeDto';
import { ShowJokeComponent } from '../show-joke/show-joke.component';

@Injectable({ providedIn: 'root' })
export class JokeDetailsService {
    constructor(private dialog: Dialog) { }

    showJokeDetails(joke: JokeDto) {
        this.dialog.open(ShowJokeComponent, {
            width: '550px',
            height: 'fit-content',
            data: {
                joke: joke
            }
        });
    }

}