import { Component, Input } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { Post as AppPost } from 'src/types';
import { Auth, AuthService } from '../auth.service';
import { PostService } from '../post.service';

type Post = Pick<AppPost, '_id' | 'likes' | 'views' | 'liked'>;

@Component({
  selector: 'app-post-interactions',
  templateUrl: './post-interactions.component.html',
  styleUrls: ['./post-interactions.component.css']
})
export class PostInteractionsComponent {
  @Input() post?: Post = undefined;
  protected auth: Auth | null = null;

  private destroy$ = new Subject<void>();

  constructor(private postService: PostService, authService: AuthService) {
    authService.auth$.pipe(takeUntil(this.destroy$)).subscribe(auth => this.auth = auth);
  }

  protected onLike() {
    if (!this.post) return;

    const post_id = this.post._id as string;
    if (this.post.liked) {
      this.postService.unlikePost(post_id).subscribe();
      --this.post.likes;
    } else {
      this.postService.likePost(post_id).subscribe();
      ++this.post.likes;
    }
    this.post.liked = !this.post.liked;
  }
}