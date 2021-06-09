import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { Responsable } from 'app/entities/responsable/responsable.model';
import { Criteria } from 'app/entities/criteria/criteria.model';

@Injectable({ providedIn: 'root' })
export class CriteriaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/criteria');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public getAllByRespoId(id: number): Observable<Array<Criteria>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Criteria>>(this.resourceUrl + '/resp/' + id);
  }

  public getAllByFiliereId(id: number): Observable<Array<Criteria>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Criteria>>(this.resourceUrl + '/filiere/' + id);
  }
  public getAllByCandidatureId(id: number): Observable<Array<Criteria>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Criteria>>(this.resourceUrl + '/candidature/' + id);
  }

  public savewithfile(id: number, criteria: FormData): Observable<{}> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.post(this.resourceUrl + '/save/' + id, criteria);
  }

  public save(criteria: Criteria): Observable<Criteria> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.post<Criteria>(this.resourceUrl, criteria);
  }
}
