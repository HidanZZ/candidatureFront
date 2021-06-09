import { Component, OnInit } from '@angular/core';
import { Candidature } from 'app/entities/candidature/candidature.model';
import { User } from 'app/admin/user-management/user-management.model';
import { ActivatedRoute } from '@angular/router';
import { Responsable } from 'app/entities/responsable/responsable.model';
import { Criteria } from 'app/entities/criteria/criteria.model';
import { AccountService } from 'app/core/auth/account.service';
import { ResponsableService } from 'app/entities/responsable/responsable.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Parcours } from 'app/entities/parcours/parcours.model';
import { Filiere } from 'app/entities/filiere/filiere.model';
import { UserService } from 'app/entities/user/user.service';
import { Account } from 'app/core/auth/account.model';
import { CriteriaService } from 'app/entities/criteria/criteria.service';
import { CandidatureService } from 'app/entities/candidature/candidature.service';

@Component({
  selector: 'jhi-shared-filiere',
  templateUrl: './shared-filiere.component.html',
  styleUrls: ['./shared-filiere.component.scss'],
})
export class SharedFiliereComponent implements OnInit {
  candidatures: Array<Candidature> = new Array<Candidature>();
  selected = false;
  candidature_table = false;
  candidature = false;
  displayModal = false;
  responsableExist = false;
  filiereId: any;
  responsable: Responsable = new Responsable();
  respTemp: Account | null = null;
  criterias: Array<Criteria> = new Array<Criteria>();
  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });
  criteriaForm = this.fb.group({
    libelle: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    type: ['TEXT'],
  });

  constructor(
    private route: ActivatedRoute,
    private accountservice: AccountService,
    private candidatureService: CandidatureService,
    private criteriaService: CriteriaService,
    private userService: UserService,
    private fb: FormBuilder,
    private responsableService: ResponsableService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console
      if (params['id'] != null) {
        this.filiereId = params['id'];
        this.responsableService.getByFiliereId(this.filiereId).subscribe(value => {
          // eslint-disable-next-line no-console
          console.log('VALUUUUUUUE', value);
          this.responsable = value;
        });
      } else {
        this.accountservice.getAuthenticationState().subscribe(value => {
          if (value != null) {
            this.responsableService.getById(value.accountId).subscribe(value1 => (this.responsable = value1));
          }
        });
      }
    });
  }

  trackIdentity(index: number, item: Candidature): number {
    return item.id!;
  }

  return(): void {
    // eslint-disable-next-line no-console
    console.log(this.candidature_table);
    this.selected = false;
    this.candidature = false;
    this.candidature_table = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  search(): void {
    this.responsableExist = false;
    const email = this.form.get(['email'])!.value;

    this.userService.getRespByEmail(email).subscribe(value => {
      // eslint-disable-next-line no-console,@typescript-eslint/no-unnecessary-condition
      if (value != null) {
        this.respTemp = value;
      } else {
        this.responsableExist = true;
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ajouter(): void {
    if (this.respTemp != null) {
      this.responsableService.getByUserId(this.respTemp.id).subscribe(value => {
        const filiere = new Filiere();
        filiere.id = this.filiereId;
        value.filiere = filiere;
        this.responsableService.update(value).subscribe(value1 => {
          this.responsable = value1;
        });
      });
    }
  }

  showformat(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.responsable?.id != null) {
      this.criteriaService.getAllByRespoId(this.responsable.id).subscribe(value => {
        this.selected = true;
        this.candidature = true;
        this.criterias = value;
      });
    }
  }

  ajouterCriteria(): void {
    const libelle = this.criteriaForm.get(['libelle'])!.value;
    const type = this.criteriaForm.get(['type'])!.value;

    const criteria = new Criteria();
    criteria.keyy = libelle;
    criteria.type = type;
    criteria.responsable = this.responsable;
    // eslint-disable-next-line no-console
    console.log(criteria);
    this.criteriaService.save(criteria).subscribe(value => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value != null) {
        if (this.responsable.id != null) {
          this.criteriaService.getAllByRespoId(this.responsable.id).subscribe(value1 => (this.criterias = value1));
        }
      }
    });
  }

  showCandidatureSoumise(): void {
    this.selected = true;
    this.candidature_table = true;
    const id = this.filiereId == null ? this.responsable.filiere?.id : this.filiereId;
    this.candidatureService.getAllByfiliereId(id).subscribe(value => {
      this.candidatures = value;
    });
  }
}
