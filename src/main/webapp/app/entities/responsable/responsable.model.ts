import { Filiere } from 'app/entities/filiere/filiere.model';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { Criteria } from 'app/entities/criteria/criteria.model';
import { Account } from 'app/core/auth/account.model';

export class Responsable {
  id?: number | null | undefined;
  filiere?: Filiere;
  ecole?: Ecole;
  criterias?: Array<Criteria>;
  user?: Account;
}
