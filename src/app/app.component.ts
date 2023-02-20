import { Component, OnInit } from '@angular/core';
import { CategoriesApiService } from './api/categories-api.service';
import { JokesApiService } from './api/jokes-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'jokeApp';

  constructor(private categoriesApiService: CategoriesApiService){}

  ngOnInit(): void {
    this.categoriesApiService.getCategoryById("b99be362-7044-4bca-aed2-e734f7999e5e").subscribe();
  }
}
