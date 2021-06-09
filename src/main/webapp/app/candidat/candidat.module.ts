import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CandidatRoutes } from 'app/candidat/candidat.route';
import { EcoleListComponent } from './ecole-list/ecole-list.component';
import { ParcoursComponent } from './parcours/parcours.component';
import { SharedModule } from 'app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FiliereComponent } from './filiere/filiere.component';
import { CandidatureComponent } from './candidature/candidature.component';

@NgModule({
  declarations: [EcoleListComponent, ParcoursComponent, FiliereComponent, CandidatureComponent],
  imports: [CommonModule, RouterModule.forChild(CandidatRoutes), SharedModule, ButtonModule, DialogModule],
})
export class CandidatModule {}
