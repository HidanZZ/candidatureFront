import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Filiere } from 'app/entities/filiere/filiere.model';
import { Observable } from 'rxjs';
import { Candidature } from 'app/entities/candidature/candidature.model';
import { Candidat } from 'app/entities/candidat/candidat.model';

@Injectable({ providedIn: 'root' })
export class CandidatureService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/candidature');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.resourceUrl, candidature);
  }

  get(id: number): Observable<Candidature> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Candidature>(this.resourceUrl + '/' + id);
  }

  getAllByfiliereId(id: number): Observable<Array<Candidature>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Candidature>>(this.resourceUrl + '/filiere/' + id);
  }

  changeEtat(id: number, etat: number): Observable<Candidature> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Candidature>(this.resourceUrl + '/' + id + '/etat/' + etat);
  }

  exist(cid: number, fid: number): Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<boolean>(this.resourceUrl + '/' + cid + '/' + fid);
  }
}
