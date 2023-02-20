import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map, tap } from 'rxjs';
import { CategoryDto } from '../../api/models/categoryDto';

@Pipe({
    name: 'categoryData'
})

export class CategoryDataPipe implements PipeTransform {

    constructor(private http: HttpClient){}

    transform(categoryId: any): any {
        return this.http.get<CategoryDto[]>('assets/categories.json')
        .pipe(
            map((categories: CategoryDto[]) => categories.filter(c => c.id === categoryId)[0].name),            
        );
    }
}