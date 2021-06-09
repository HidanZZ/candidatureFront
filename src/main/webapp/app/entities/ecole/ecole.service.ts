import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Ecole } from 'app/entities/ecole/ecole.model';

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
}
