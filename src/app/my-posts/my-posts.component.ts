import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, map, switchMap, tap } from 'rxjs';

import { PostPreview } from 'src/types';
import { ModalService } from '../modal/modal.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  protected readonly postsPerPage = 5;

  protected pageNum$ = inject(ActivatedRoute).queryParamMap.pipe(
    map(p => +(p.get('page') || 1))
  );

  protected page$ = this.pageNum$.pipe(switchMap(num => this.postService.myPosts(num, this.postsPerPage)));

  constructor(private postService: PostService, private router: Router, private modalService: ModalService) { }

  protected onPageChange(event: PageChangedEvent) {
    this.router.navigate([], { queryParams: { page: event.page }, queryParamsHandling: 'merge' });
  }

  protected deletePost(post: PostPreview) {
    this.postService.deletePost(post).pipe(
      tap(() => window.location.reload()),
      catchError(error => {
        if (error.status !== 0) {
          this.modalService.showError(error.error.message);
        }

        this.modalService.showError("An error has happened")
        return error;
      })
    ).subscribe();
  }
}
