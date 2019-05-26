import { Component, OnInit, Inject } from '@angular/core';
import { Site } from 'src/app/core/models/site.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit {
  siteForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SiteInfoComponent>
  ) {}

  siteId: string;

  ngOnInit() {
    console.log(this.siteId, MAT_DIALOG_DATA);
  }

  save() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close('Saved');
  }
}
