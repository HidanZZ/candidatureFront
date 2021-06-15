import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { Candidature } from 'app/entities/candidature/candidature.model';

@Injectable({ providedIn: 'root' })
export class EcoleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ecole');
  private _ecole: Ecole = new Ecole();

  get ecole(): Ecole {
    return this._ecole;
  }

  set ecole(value: Ecole) {
    this._ecole = value;
  }

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  public availableEcoles(): Observable<Array<Ecole>> {
    return this.http.get<Array<Ecole>>(this.resourceUrl + '/available');
  }

  public all(): Observable<Array<Ecole>> {
    return this.http.get<Array<Ecole>>(this.resourceUrl);
  }

  public findByID(id: number): Observable<Ecole> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Ecole>(this.resourceUrl + '/' + id);
  }

  public findByUserID(id: number): Observable<Ecole> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Ecole>(this.resourceUrl + '/user/' + id);
  }

  changeEtat(id: number, etat: number): Observable<Ecole> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<Ecole>(this.resourceUrl + '/' + id + '/etat/' + etat);
  }

  activatedSchool(): Observable<number> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<number>(this.resourceUrl + '/countByActivated');
  }

  nonActivatedSchool(): Observable<number> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<number>(this.resourceUrl + '/countByNonActivated');
  }

  public savewithfile(id: number, image: FormData): Observable<Ecole> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.post<Ecole>(this.resourceUrl + '/' + id + '/image', image);
  }
}
