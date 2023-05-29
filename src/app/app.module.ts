import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginationModule } from "ngx-bootstrap/pagination";
import { QuillModule } from 'ngx-quill';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormCtrlDirective } from './form-ctrl.directive';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { SubmitBtnComponent } from './submit-btn/submit-btn.component';
import { PostInteractionsComponent } from './post-interactions/post-interactions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    EditPostComponent,
    FormCtrlDirective,
    HeaderComponent,
    HomeComponent,
    LatestPostsComponent,
    LoginComponent,
    ModalComponent,
    MyPostsComponent,
    NewPostComponent,
    PostComponent,
    PostFormComponent,
    PostPreviewComponent,
    RegisterComponent,
    SubmitBtnComponent,
    PostInteractionsComponent,
    NotFoundComponent,
    FavoritesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    QuillModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
