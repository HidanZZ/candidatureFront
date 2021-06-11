import { Component, OnInit } from '@angular/core';
import { Parcours } from 'app/entities/parcours/parcours.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Filiere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { ParcoursService } from 'app/entities/parcours/parcours.service';

@Component({
  selector: 'jhi-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss'],
})
export class FiliereComponent implements OnInit {
  filieres: Array<Filiere> = new Array<Filiere>();
  parcoursId: any;
  displayModal: any = false;
  form = this.fb.group({
    libelle: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    reference: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    nbrPlaces: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[0-9]+$')]],
  });
  referenceExists = false;
  libelleExists = false;

  constructor(
    private filiereService: FiliereService,
    private parcoursService: ParcoursService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  get parcours(): Parcours {
    return this.parcoursService.parcours;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console

      this.parcoursId = params['id'];
    });
    this.getFilieres();
  }

  getFilieres(): void {
    this.filiereService.getfiliereParparcoursID(this.parcoursId).subscribe(value => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value != null) {
        this.filieres = value;
      }
    });
  }

  save(): void {
    this.referenceExists = false;
    this.libelleExists = false;
    const parcours = new Parcours();
    parcours.id = this.parcoursId;
    const filiere = new Filiere();
    filiere.libelle = this.form.get(['libelle'])!.value;

    filiere.reference = this.form.get(['reference'])!.value;
    filiere.nbrplaces = this.form.get(['nbrPlaces'])!.value;
    filiere.parcours = parcours;
    this.filiereService.save(filiere).subscribe(value => {
      // eslint-disable-next-line no-console
      if (value === -1) {
        this.referenceExists = true;
      } else if (value === -2) {
        this.libelleExists = true;
      } else {
        this.displayModal = false;
        this.form.reset();
        this.getFilieres();
      }
    });
  }

  delete(filiere: Filiere): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (filiere != null) {
      if (filiere.id != null) {
        this.filiereService.delete(filiere.id).subscribe(() => this.getFilieres());
      }
    }
  }
}
