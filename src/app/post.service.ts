import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Post, PostPreview } from 'src/types';

export interface Page {
  total_count: number,
  posts: PostPreview[],
}

export interface Category {
  _id: string,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPage(page: number, limit: number, category: string | null) {
    let params = new HttpParams()
      .set('offset', (page - 1) * limit)
      .set('limit', limit);

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<Page>(environment.host + '/api/posts', { params });
  }

  getCategories() {
    return this.http.get<Category[]>(environment.host + '/api/categories');
  }

  getPost(postId: string) {
    return this.http.get<Post>(environment.host + 'api/posts/' + postId);
  }

  createPost(title: string, content: string, description?: string, picture?: File, category?: string) {
    const data = new FormData();
    data.set('title', title)
    data.set('content', content);

    description && data.set('description', description);
    picture && data.set('picture', picture);
    category && data.set('category', category);

    return this.http.post<{ message: string }>(environment.host + 'api/posts', data);
  }

  updatePost(id: string, title: string, content: string, description?: string, picture?: File, category?: string) {
    const data = new FormData();
    data.set('title', title)
    data.set('content', content);

    description && data.set('description', description);
    picture && data.set('picture', picture);
    category && data.set('category', category);

    return this.http.post<{ message: string }>(environment.host + '/api/posts/' + id, data);
  }

  deletePost(post: PostPreview) {
    return this.http.delete<{ message: string }>(environment.host + '/api/posts/' + post._id);
  }

  myPosts(page: number, limit: number) {
    const params = {
      offset: (page - 1) * limit,
      limit
    };

    return this.http.get<Page>(environment.host + '/api/posts/my-posts', { params });
  }

  favorites(page: number, limit: number) {
    const params = {
      offset: (page - 1) * limit,
      limit
    };

    return this.http.get<Page>(environment.host + '/api/favorites', { params });
  }

  likePost(post_id: string) {
    return this.http.post(environment.host + '/api/favorites', { post_id });
  }

  unlikePost(post_id: string) {
    return this.http.delete(environment.host + '/api/favorites/' + post_id);
  }
}
