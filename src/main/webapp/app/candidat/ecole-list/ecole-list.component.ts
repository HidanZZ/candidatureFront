import { Component, OnInit } from '@angular/core';
import { EcoleService } from 'app/entities/ecole/ecole.service';
import { Ecole } from 'app/entities/ecole/ecole.model';

@Component({
  selector: 'jhi-ecole-list',
  templateUrl: './ecole-list.component.html',
  styleUrls: ['./ecole-list.component.scss'],
})
export class EcoleListComponent implements OnInit {
  availableEcole: Array<Ecole> = new Array<Ecole>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private ecoleService: EcoleService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method,@typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.ecoleService.availableEcoles().subscribe(value => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value != null) {
        this.availableEcole = value;
      }
    });
  }

  select(ecole: Ecole): void {
    this.ecoleService.ecole = ecole;
  }
}
