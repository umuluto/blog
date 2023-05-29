import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostService } from '../post.service';

export function observePost() {
  const params$ = inject(ActivatedRoute).paramMap;
  const service = inject(PostService);

  return params$.pipe(
    switchMap(params => {
      const postId = params.get('post_id') as string;
      return service.getPost(postId);
    })
  );
}
