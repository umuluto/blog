import { Component, Input } from '@angular/core';

import { PostPreview } from 'src/types';

@Component({
  selector: 'app-post-preview[post]',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {
  @Input() post!: PostPreview;
}
