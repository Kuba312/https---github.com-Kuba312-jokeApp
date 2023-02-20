import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JokeDto } from './models/jokeDto';

@Injectable({ providedIn: 'root' })
export class JokesApiService {

    constructor(private readonly httpClient: HttpClient) { }
    getJokes(): Observable<JokeDto[]> {
        return this.httpClient.get<JokeDto[]>('assets/jokes.json');
    }

}