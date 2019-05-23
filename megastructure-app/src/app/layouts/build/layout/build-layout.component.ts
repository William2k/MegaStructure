import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/route-animations';

@Component({
  selector: 'app-build-layout',
  templateUrl: './build-layout.component.html',
  styleUrls: ['./build-layout.component.scss'],
  animations: [fadeAnimation]
})
export class BuildLayoutComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-purple');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-purple');
  }
}
