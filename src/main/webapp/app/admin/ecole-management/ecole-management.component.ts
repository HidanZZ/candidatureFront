import { Component, OnInit } from '@angular/core';
import { EcoleService } from 'app/entities/ecole/ecole.service';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { Candidature } from 'app/entities/candidature/candidature.model';

@Component({
  selector: 'jhi-ecole-management',
  templateUrl: './ecole-management.component.html',
  styleUrls: ['./ecole-management.component.scss'],
})
export class EcoleManagementComponent implements OnInit {
  ecoles: Array<Ecole> = new Array<Ecole>();

  constructor(private ecoleService: EcoleService) {}

  ngOnInit(): void {
    this.ecoleService.all().subscribe(value => (this.ecoles = value));
  }
  trackIdentity(index: number, item: Ecole): number {
    return item.id!;
  }
}
