import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ManagedUserVm } from 'app/entities/user/managed-user-vm.model';
import { Parcours } from 'app/entities/parcours/parcours.model';

@Injectable({ providedIn: 'root' })
export class ParcoursService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/parcours');
  private _parcours: Parcours = new Parcours();

  get parcours(): Parcours {
    return this._parcours;
  }

  set parcours(value: Parcours) {
    this._parcours = value;
  }

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(parcours: Parcours): Observable<{}> {
    return this.http.post(this.resourceUrl, parcours);
  }

  getParcoursParEcoleID(id: number): Observable<Array<Parcours>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Parcours>>(this.resourceUrl + '/ecole/' + id);
  }

  delete(id: number): Observable<{}> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.delete(this.resourceUrl + '/' + id);
  }
}
