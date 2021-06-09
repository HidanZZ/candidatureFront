import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
import { RegisterService } from './register.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'app/config/constants';
import { Authority } from 'app/config/authority.constants';
import { ManagedUserVm } from 'app/entities/user/managed-user-vm.model';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('nom', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  success = false;
  authority = '';

  registerForm = this.fb.group({
    nom: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    prenom: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    ecole: [''],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(private registerService: RegisterService, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      switch (params['name']) {
        case Constants.candidat:
          this.authority = Authority.CANDIDAT;
          break;
        case Constants.responsable:
          this.authority = Authority.RESPONSABLE;
          break;
        case Constants.ecole:
          this.authority = Authority.ECOLE;
          this.registerForm
            .get(['ecole'])
            ?.setValidators([
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(50),
              Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
            ]);
          break;
      }
    });
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;

    const pass = this.registerForm.get(['password'])!.value;
    if (pass !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const em = this.registerForm.get(['email'])!.value;
      const firstname = this.registerForm.get(['nom'])!.value;
      const lastname = this.registerForm.get(['prenom'])!.value;
      const ecole = this.registerForm.get(['ecole'])!.value;

      this.registerService
        .save({
          role: this.authority,
          firstName: firstname,
          lastName: lastname,
          email: em,
          password: pass,
          nom: ecole,
          langKey: 'fr',
        })
        .subscribe(
          () => (this.success = true),
          response => this.processError(response)
        );
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
