import { Component, OnInit, Renderer2 } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/route-animations';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [fadeAnimation]
})
export class ContentLayoutComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-blue');
  }
}
