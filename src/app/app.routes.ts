import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list';
import { AuctionListComponent } from './components/auction-list/auction-list';

export const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'category/:name', component: AuctionListComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./components/signin/signin').then(m => m.SigninComponent)
  },
  {
    path: 'create-auction',
    loadComponent: () =>
      import('./components/create-auction/create-auction').then(m => m.CreateAuctionComponent)
  },
  {
    path: 'create-category',
    loadComponent: () => import('./components/create-category/create-category')
      .then(m => m.CreateCategoryComponent)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search-auction/search-auction')
        .then(m => m.SearchAuctionComponent)
  },

  {
    path: 'my-auctions',
    loadComponent: () =>
      import('./components/my-auctions/my-auctions')
        .then(m => m.MyAuctionsComponent)
  }

];
