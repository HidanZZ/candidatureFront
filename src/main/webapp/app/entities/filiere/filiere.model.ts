import { Responsable } from 'app/entities/responsable/responsable.model';
import { Parcours } from 'app/entities/parcours/parcours.model';

export class Filiere {
  id?: number;
  nbrplaces?: number;
  libelle?: string;
  reference?: string;
  responsable?: Responsable;
  parcours?: Parcours;
}
