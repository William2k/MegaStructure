import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Site } from 'src/app/core/models/site.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit {
  siteForm: FormGroup;
  managers: FormArray;

  constructor(
    @Inject(MAT_DIALOG_DATA) public site: Site,
    public dialogRef: MatDialogRef<SiteInfoComponent>,
    private fb: FormBuilder
  ) {
    this.siteForm = fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      managers: fb.array([this.createManager()])
    });
  }

  ngOnInit(): void {
    console.log(this.site.id);
  }

  createManager(): FormGroup {
    return this.fb.group({
      username: ['']
    });
  }

  addManager(): void {
    this.managers = this.siteForm.get('managers') as FormArray;

    if (this.managers.controls.some(m => m.pristine)) {
      return;
    }

    this.managers.push(this.createManager());
  }

  save(): void {
    const form = {
      ...this.siteForm.value,
      managers: (this.siteForm.value.managers as User[]).map(m => m.username).filter(Boolean)
    };
    console.log(form);
    // post to db
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close('Saved');
  }
}
