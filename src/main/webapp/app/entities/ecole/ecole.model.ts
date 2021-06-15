import { Account } from 'app/core/auth/account.model';

export class Ecole {
  id?: number;
  nom?: string;
  user?: Account;
  reference?: string;
  image?: string;
  activated?: boolean;
}
