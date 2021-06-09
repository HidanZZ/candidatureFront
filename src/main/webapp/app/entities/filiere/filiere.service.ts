import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Parcours } from 'app/entities/parcours/parcours.model';
import { Filiere } from 'app/entities/filiere/filiere.model';

@Injectable({ providedIn: 'root' })
export class FiliereService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/filiere');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}
  save(filiere: Filiere): Observable<{}> {
    return this.http.post(this.resourceUrl, filiere);
  }
  getfiliereParparcoursID(id: number): Observable<Array<Filiere>> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Array<Filiere>>(this.resourceUrl + '/parcours/' + id);
  }
  getById(id: number): Observable<Filiere> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Filiere>(this.resourceUrl + '/' + id);
  }
  delete(id: number): Observable<{}> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.delete(this.resourceUrl + '/' + id);
  }
}
