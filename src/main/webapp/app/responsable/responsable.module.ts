import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { responsableRoute } from 'app/responsable/responsable.route';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(responsableRoute)],
})
export class ResponsableModule {}
