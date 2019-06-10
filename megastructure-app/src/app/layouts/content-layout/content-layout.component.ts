import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/route-animations';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [fadeAnimation]
})
export class ContentLayoutComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-blue');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-blue');
  }
}
