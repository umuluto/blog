import { Component, inject } from '@angular/core';

import { combineLatest, map, shareReplay } from 'rxjs';

import { Post } from 'src/types';
import { Auth, AuthService } from '../auth.service';
import { observePost } from './observe-post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  protected post$ = observePost().pipe(shareReplay(1));
  protected isAuthor$ = combineLatest([this.post$, inject(AuthService).auth$]).pipe(
    map(tpl => this.isAuthor(tpl))
  )

  private isAuthor([post, auth]: [Post, Auth | null]) {
    return post.createdBy._id === auth?.user_id;
  }
}
