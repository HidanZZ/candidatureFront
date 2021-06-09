import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcoleRoutes } from 'app/ecole/ecole.route';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(EcoleRoutes)],
})
export class EcoleModule {}
