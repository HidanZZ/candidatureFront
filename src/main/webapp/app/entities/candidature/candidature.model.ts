import { Filiere } from 'app/entities/filiere/filiere.model';
import { Candidat } from 'app/entities/candidat/candidat.model';
import { Criteria } from 'app/entities/criteria/criteria.model';

export class Candidature {
  id?: number;
  reference?: string;
  etat?: string;
  filiere?: Filiere;
  candidat?: Candidat;
  createdDate?: Date;
  criterias?: Array<Criteria>;
}
