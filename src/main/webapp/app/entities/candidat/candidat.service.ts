import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class CandidatService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/candidat');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}
  count(): Observable<number> {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<number>(this.resourceUrl + '/countAll');
  }
}
