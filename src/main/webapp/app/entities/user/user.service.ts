import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { Pagination } from 'app/core/request/request.model';
import { IUser, getUserIdentifier } from './user.model';
import { Responsable } from 'app/entities/responsable/responsable.model';
import { Account } from 'app/core/auth/account.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/users');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  public getByEmail(email: string): Observable<Account> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Account>(this.resourceUrl + '/' + email);
  }
  public getRespByEmail(email: string): Observable<Account> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Account>(this.resourceUrl + '/resp/' + email);
  }

  addUserToCollectionIfMissing(userCollection: IUser[], ...usersToCheck: (IUser | null | undefined)[]): IUser[] {
    const users: IUser[] = usersToCheck.filter(isPresent);
    if (users.length > 0) {
      const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
      const usersToAdd = users.filter(userItem => {
        const userIdentifier = getUserIdentifier(userItem);
        if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
          return false;
        }
        userCollectionIdentifiers.push(userIdentifier);
        return true;
      });
      return [...usersToAdd, ...userCollection];
    }
    return userCollection;
  }
}
