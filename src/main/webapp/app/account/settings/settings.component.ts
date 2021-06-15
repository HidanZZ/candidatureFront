import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/ecole.service';
import { Criteria } from 'app/entities/criteria/criteria.model';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  account!: Account;
  success = false;
  ecole: Ecole = new Ecole();
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });
  displayModal = false;
  file: File | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, private ecoleService: EcoleService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.settingsForm.patchValue({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
        });

        this.account = account;
        this.ecoleService.findByUserID(account.id).subscribe(value => (this.ecole = value));
      }
    });
  }

  save(): void {
    this.success = false;

    this.account.firstName = this.settingsForm.get('firstName')!.value;
    this.account.lastName = this.settingsForm.get('lastName')!.value;
    this.account.email = this.settingsForm.get('email')!.value;

    this.accountService.save(this.account).subscribe(() => {
      this.success = true;

      this.accountService.authenticate(this.account);
    });
  }

  handleFileInput($event: Event): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.file = event.target.files[0];
  }

  submit(): void {
    if (this.file !== undefined) {
      const fd = new FormData();
      fd.append('file', this.file);
      if (this.ecole.id != null) {
        this.ecoleService.savewithfile(this.ecole.id, fd).subscribe(value => {
          this.ecole = value;
          this.displayModal = false;
          this.file = undefined;
        });
      }
    }
  }
}
