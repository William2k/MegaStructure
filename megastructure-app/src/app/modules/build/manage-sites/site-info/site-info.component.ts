import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map, take, skip, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { Site } from 'src/app/core/models/site.model';
import { User } from 'src/app/core/models/user.model';
import { RootStoreState } from 'src/app/store';
import { SaveSiteRequestAction } from 'src/app/store/site-store/actions';
import { getSiteState } from 'src/app/store/site-store/selectors';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  saving$: Observable<boolean>;
  siteForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public site: Site,
    private store$: Store<RootStoreState.State>,
    public dialogRef: MatDialogRef<SiteInfoComponent>,
    private fb: FormBuilder
  ) {
    this.siteForm = fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      managers: fb.array([this.createManager()])
    });

    this.saving$ = store$
      .select(getSiteState)
      .pipe(map(state => state.savingSite));
  }

  ngOnInit(): void {
    if (this.site.name) {
      this.siteForm.controls.name.setValue(this.site.name);
      this.siteForm.controls.type.setValue(this.site.type);

      const managerControls = this.siteForm.get('managers') as FormArray;

      for (const name of this.site.managers) {
        managerControls.push(this.createManager(name));
      }

      managerControls.push(this.createManager());
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createManager(username: string = ''): FormGroup {
    return this.fb.group({
      username: [username]
    });
  }

  addManager(): void {
    const managers = this.siteForm.get('managers') as FormArray;

    if (managers.controls.some(m => m.pristine)) {
      return;
    }

    managers.push(this.createManager());
  }

  removeManager(index: number): void {
    const managers = this.siteForm.get('managers') as FormArray;

    managers.removeAt(index);
  }

  save(): void {
    const form = {
      ...this.siteForm.value,
      managers: (this.siteForm.value.managers as User[])
        .map(m => m.username)
        .filter(Boolean)
    } as Site;

    this.store$.dispatch(new SaveSiteRequestAction({ site: form }));

    this.store$
      .select(getSiteState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        if (!state.savingSite) {
          this.dialogRef.close(true);
        }
      });
  }
}
