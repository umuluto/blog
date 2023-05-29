import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
      { path: 'my-posts', component: MyPostsComponent, canActivate: [authGuard] },
      { path: 'new-post', component: NewPostComponent, canActivate: [authGuard] },
      { path: 'latest', component: LatestPostsComponent },
      { path: '', redirectTo: 'latest', pathMatch: 'full' },
    ]
  },
  { path: 'posts/:post_id/edit', component: EditPostComponent, canActivate: [authGuard] },
  { path: 'posts/:post_id', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
