import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { CategoryDto } from './models/categoryDto';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {

    constructor(private readonly httpClient: HttpClient) { }
    getCategories(): Observable<CategoryDto[]> {
        return this.httpClient.get<CategoryDto[]>('assets/categories.json');
    }

    getCategoryById(categoryId: string): any {
        return this.httpClient.get<CategoryDto[]>('assets/categories.json')
            .pipe(
                map((categories: CategoryDto[]) => categories.filter(c => c.id === categoryId))
            );
    }

}