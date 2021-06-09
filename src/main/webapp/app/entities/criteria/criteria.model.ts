import { Responsable } from 'app/entities/responsable/responsable.model';
import { Candidature } from 'app/entities/candidature/candidature.model';

export class Criteria {
  id?: number;
  keyy?: string;
  valeur?: string;
  file?: File;
  type?: string;
  responsable?: Responsable;
  candidature?: Candidature;
}
