import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filiere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { Criteria } from 'app/entities/criteria/criteria.model';
import { CriteriaService } from 'app/entities/criteria/criteria.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Candidat } from 'app/entities/candidat/candidat.model';
import { Candidature } from 'app/entities/candidature/candidature.model';
import { CandidatureService } from 'app/entities/candidature/candidature.service';

@Component({
  selector: 'jhi-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss'],
})
export class CandidatureComponent implements OnInit {
  filiere: Filiere = new Filiere();
  user: any;
  exist = false;
  success = false;

  criterias: Array<Criteria> = new Array<Criteria>();
  form = this.fb.group({
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
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private filiereService: FiliereService,
    private candidatureService: CandidatureService,
    private criteriaService: CriteriaService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(value => (this.user = value));
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console

      this.filiere.id = params['id'];
    });
    if (this.filiere.id != null) {
      this.filiereService.getById(this.filiere.id).subscribe(value => {
        this.filiere = value;
        if (this.filiere.id != null) {
          this.candidatureService.exist(this.user.accountId, this.filiere.id).subscribe(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            value1 => (this.exist = value1)
          );
        }
      });
      this.criteriaService.getAllByFiliereId(this.filiere.id).subscribe(value => {
        this.criterias = value;
        this.criterias.forEach(value1 => {
          if (value1.keyy != null) {
            this.form.addControl(value1.keyy, new FormControl('', Validators.required));
            value1.responsable = undefined;
            value1.id = undefined;
          }
        });
      });
    }
  }

  submit(): void {
    const candidat = new Candidat();
    candidat.id = this.user.accountId;
    const candidature = new Candidature();
    candidature.candidat = candidat;
    candidature.filiere = this.filiere;

    this.candidatureService.save(candidature).subscribe(value => {
      this.criterias.forEach(criteria => {
        if (criteria.keyy != null) {
          // eslint-disable-next-line no-console

          // eslint-disable-next-line no-console
          criteria.valeur = this.form.get([criteria.keyy])!.value;
          criteria.candidature = value;
          this.criteriaService.save(criteria).subscribe(value1 => {
            if (criteria.file != null) {
              // eslint-disable-next-line no-console
              console.log('heeeeeere file');
              const fd = new FormData();
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              fd.append('file', criteria.file);
              if (value1.id != null) {
                // eslint-disable-next-line no-console
                console.log('heeeeeere id');
                this.criteriaService.savewithfile(value1.id, fd).subscribe();
              }
            }
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        }
      });
      this.success = true;
    });
  }

  handleFileInput($event: Event, c: Criteria): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    c.file = event.target.files[0];
  }

  return(): void {
    window.history.back();
  }
}
