import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';

import { Page, PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnDestroy {
  readonly postsPerPage = 5;

  readonly categories$ = this.postService.getCategories();
  page$?: Observable<Page>;
  pageNum = 1;
  category: string | null = null;

  private readonly subscriptions;

  constructor(private postService: PostService, route: ActivatedRoute, private router: Router) {
    const paramSubscription = route.queryParamMap.subscribe(params => this.onParamsChange(params));
    this.subscriptions = [paramSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onPageChange(event: PageChangedEvent): void {
    if (event.page === this.pageNum) {
      return;
    }

    this.router.navigate([], { queryParams: { page: event.page, category: this.category } });
  }

  private onParamsChange(params: ParamMap): void {
    this.category = params.get('category');

    this.pageNum = +(params.get('page') || 1);
    this.page$ = this.postService.getPage(this.pageNum, this.postsPerPage, this.category);
  }
}
