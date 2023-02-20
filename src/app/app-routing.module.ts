import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/jokes-list', pathMatch: 'full' },
  {
    path: 'jokes-list',
    loadChildren: () => import('./jokes/jokes.module').then(m => m.JokesModule)
  },
  {
    path: 'my-jokes',
    loadChildren: () => import('./my-jokes/my-jokes.module').then(m => m.MyJokesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
