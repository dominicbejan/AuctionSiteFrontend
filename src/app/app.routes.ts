import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list';
import { AuctionListComponent } from './components/auction-list/auction-list';
import {SearchAuctionComponent} from './components/search-auction/search-auction';
import {CategoryDetailsComponent} from './components/category-details/category-details.component';

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
    component: SearchAuctionComponent
  },

  {
    path: 'my-auctions',
    loadComponent: () =>
      import('./components/my-auctions/my-auctions')
        .then(m => m.MyAuctionsComponent)
  },

  {
    path: 'update-profile',
    loadComponent: () => import('./components/update-profile/update-profile.component').then(m => m.UpdateProfileComponent)
  },

  {
    path: 'category/:name',
    loadComponent: () => import('./components/category-details/category-details.component')
      .then(m => m.CategoryDetailsComponent)
  },

  {
    path: 'update-auction/:id',
    loadComponent: () => import('./components/update-auction/update-auction.component').then(m => m.UpdateAuctionComponent)
  }
];
