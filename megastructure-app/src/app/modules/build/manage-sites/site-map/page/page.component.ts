import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { SitePageTree } from 'src/app/core/models/site.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() pageTree: SitePageTree;
  @Output() addPage: EventEmitter<number> = new EventEmitter();
  @Output() editPage: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onAddPage(parentRef: number): void {
    this.addPage.emit(parentRef);
  }

  onEditPage(pageRef: number): void {
    this.editPage.emit(pageRef);
  }

  addPageClick(): void {
    this.addPage.emit(this.pageTree.page.pageRef);
  }

  editPageClick(): void {
    this.editPage.emit(this.pageTree.page.pageRef);
  }
}
