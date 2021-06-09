import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { Responsable } from 'app/entities/responsable/responsable.model';

@Injectable({ providedIn: 'root' })
export class ResponsableService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/responsable');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public getById(id: number | null): Observable<Responsable> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Responsable>(this.resourceUrl + '/' + id);
  }

  public getByFiliereId(id: number): Observable<Responsable> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Responsable>(this.resourceUrl + '/filiere/' + id);
  }

  public getByUserId(id: number): Observable<Responsable> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Responsable>(this.resourceUrl + '/user/' + id);
  }

  public update(responsable: Responsable): Observable<Responsable> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.patch<Responsable>(this.resourceUrl, responsable);
  }
}
