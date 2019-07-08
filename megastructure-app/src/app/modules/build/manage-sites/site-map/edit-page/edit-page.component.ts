import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SitePage } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {
  @Input() page: SitePage;
  @Output() cancelEditPage: EventEmitter<void> = new EventEmitter();
  editPageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editPageForm = fb.group({
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      isActive: [false, [Validators.required]]
    });
  }

  save(): void {}

  cancel(): void {
    this.cancelEditPage.emit();
  }
}
