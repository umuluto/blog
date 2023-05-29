import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { map, switchMap } from 'rxjs';

import { PostService } from '../post.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  postsPerPage = 5;

  protected pageNum$ = inject(ActivatedRoute).queryParamMap.pipe(
    map(p => +(p.get('page') || 1))
  );

  protected page$ = this.pageNum$.pipe(switchMap(num => this.postService.favorites(num, this.postsPerPage)));

  constructor(private postService: PostService, private router: Router) { }

  protected onPageChange(event: PageChangedEvent) {
    this.router.navigate([], { queryParams: { page: event.page }, queryParamsHandling: 'merge' });
  }
}
