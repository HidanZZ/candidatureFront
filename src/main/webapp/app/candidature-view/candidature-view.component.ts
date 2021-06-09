import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'app/entities/candidature/candidature.model';
import { CandidatureService } from 'app/entities/candidature/candidature.service';
import { Criteria } from 'app/entities/criteria/criteria.model';
import { CriteriaService } from 'app/entities/criteria/criteria.service';

@Component({
  selector: 'jhi-candidature-view',
  templateUrl: './candidature-view.component.html',
  styleUrls: ['./candidature-view.component.scss'],
})
export class CandidatureViewComponent implements OnInit {
  candidature: Candidature | null = null;
  criterias: Array<Criteria> = new Array<Criteria>();

  constructor(private route: ActivatedRoute, private candidatureService: CandidatureService, private criteriaService: CriteriaService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console
      const id = params['id'];
      this.candidatureService.get(id).subscribe(value => {
        this.candidature = value;
        if (this.candidature.id != null) {
          this.criteriaService.getAllByCandidatureId(this.candidature.id).subscribe(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            value1 => (this.criterias = value1)
          );
        }
      });
    });
  }
  accepter(): void {
    if (this.candidature?.id != null) {
      this.candidatureService.changeEtat(this.candidature.id, 1).subscribe(value => (this.candidature = value));
    }
  }
  refuser(): void {
    if (this.candidature?.id != null) {
      this.candidatureService.changeEtat(this.candidature.id, 0).subscribe(value => (this.candidature = value));
    }
  }
}
