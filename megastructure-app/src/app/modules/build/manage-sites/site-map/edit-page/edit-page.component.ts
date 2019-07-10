import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SitePage } from 'src/app/core/models/site.model';
import { RootStoreState } from 'src/app/store';
import { SavePageRequestAction } from 'src/app/store/site-store/actions';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  @Input() siteName: string;
  @Input() page: SitePage;
  @Output() closeEditPage: EventEmitter<void> = new EventEmitter();
  editPageForm: FormGroup;

  constructor(
    private store$: Store<RootStoreState.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editPageForm = this.fb.group({
      title: [this.page.title, [Validators.required]],
      link: [
        this.page.link,
        this.page.parentRef ? [Validators.required] : null
      ],
      isActive: [this.page.isActive, [Validators.required]]
    });
  }

  save(): void {
    this.page = {...this.page, ...this.editPageForm.value};

    this.store$.dispatch(
      new SavePageRequestAction({ sitename: this.siteName, page: this.page })
    );
  }

  cancel(): void {
    this.closeEditPage.emit();
  }
}