import { Component, OnDestroy, ViewChild } from '@angular/core';

import { catchError, mergeMap, shareReplay, take, tap } from 'rxjs';

import { Post } from 'src/types';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostService } from '../post.service';
import { observePost } from '../post/observe-post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnDestroy {
  @ViewChild(PostFormComponent, { read: PostFormComponent }) private form!: PostFormComponent;

  protected status: null | 'loading' | 'success' = null;

  private readonly post$ = observePost().pipe(shareReplay(1));
  private readonly subscriptions;

  constructor(private postService: PostService) {
    const postSubscription = this.post$.subscribe(post => this.changePost(post));
    this.subscriptions = [postSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  protected onReset() {
    this.status = null;
    this.post$.pipe(take(1)).subscribe(post => this.changePost(post));
  }

  protected onSubmit() {
    this.status = 'loading';
    const res = this.post$.pipe(
      take(1),
      mergeMap(post => this.submit(post._id)),
      tap(() => this.status = 'success'),
      catchError(error => (this.status = null, error)),
    ).subscribe();
  }

  private submit(id: string) {
    const value = this.form.formCtrl.value;

    if (!value.title || !value.content) {
      throw Error("title and content fields shouldn't be disabled");
    }

    const picture = this.form.getPicture();

    return this.postService.updatePost(
      id,
      value.title,
      value.content,
      value.description || undefined,
      picture instanceof File ? picture : undefined,
      value.category || undefined,
    );
  }

  private changePost(post: Post) {
    const data = {
      title: post.title,
      content: post.content,
      description: post.description ?? null,
      category: post.category?._id ?? null,
    };

    this.form.formCtrl.setValue(data);
    this.form.setPicture(post.picture ?? null);
  }
}
