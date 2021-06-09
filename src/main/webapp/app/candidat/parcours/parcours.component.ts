import { Component, OnInit } from '@angular/core';
import { ParcoursService } from 'app/entities/parcours/parcours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Parcours } from 'app/entities/parcours/parcours.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { AccountService } from 'app/core/auth/account.service';
import { Authority } from 'app/config/authority.constants';
import { EcoleService } from 'app/entities/ecole/ecole.service';

@Component({
  selector: 'jhi-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss'],
})
export class ParcoursComponent implements OnInit {
  parcours: Array<Parcours> = new Array<Parcours>();
  ecoleID: any;
  displayModal: any = false;
  form = this.fb.group({
    libelle: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    reference: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
  });
  referenceExists = false;
  libelleExists = false;

  constructor(
    private parcoursService: ParcoursService,
    private ecoleService: EcoleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private accountservice: AccountService
  ) {}
  get ecole(): Ecole {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return this.ecoleService.ecole;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console

      this.ecoleID = params['id'];
    });
    if (this.ecoleID == null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this.accountservice.getAuthenticationState().subscribe(value => (this.ecoleID = value?.accountId));
    }
    this.getParcours();
  }
  getParcours(): void {
    this.parcoursService.getParcoursParEcoleID(this.ecoleID).subscribe(value => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value != null) {
        this.parcours = value;
      }
    });
  }
  save(): void {
    this.referenceExists = false;
    this.libelleExists = false;
    const ecole = new Ecole();
    ecole.id = this.ecoleID;
    const prcours = new Parcours();
    prcours.libelle = this.form.get(['libelle'])!.value;

    prcours.reference = this.form.get(['reference'])!.value;
    prcours.ecole = ecole;
    this.parcoursService.save(prcours).subscribe(value => {
      // eslint-disable-next-line no-console
      if (value === -1) {
        this.referenceExists = true;
      } else if (value === -2) {
        this.libelleExists = true;
      } else {
        this.displayModal = false;
        this.form.reset();
        this.getParcours();
      }
    });
  }

  delete(parcour: Parcours): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (parcour != null) {
      if (parcour.id != null) {
        this.parcoursService.delete(parcour.id).subscribe(() => this.getParcours());
      }
    }
  }

  navigate(parcour: Parcours | undefined): void {
    if (parcour != null) {
      this.parcoursService.parcours = parcour;
      if (parcour.id != null) {
        if (this.accountservice.hasAnyAuthority(Authority.ECOLE)) {
          this.router.navigate(['/ecole/parcours', parcour.id]);
        } else if (this.accountservice.hasAnyAuthority(Authority.CANDIDAT)) {
          this.router.navigate(['/candidat/parcours', parcour.id]);
        }
      }
    }
  }
}
