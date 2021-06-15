import { Component, OnInit } from '@angular/core';
import { Ecole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/ecole.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-ecole-view',
  templateUrl: './ecole-view.component.html',
  styleUrls: ['./ecole-view.component.scss'],
})
export class EcoleViewComponent implements OnInit {
  ecole: Ecole = new Ecole();

  constructor(private ecoleService: EcoleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line no-console
      const id = params['id'];
      this.ecoleService.findByID(id).subscribe(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        value => (this.ecole = value)
      );
    });
  }

  refuser(): void {
    if (this.ecole.id != null) {
      this.ecoleService.changeEtat(this.ecole.id, 0).subscribe(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        value => (this.ecole = value)
      );
    }
  }

  accepter(): void {
    if (this.ecole.id != null) {
      this.ecoleService.changeEtat(this.ecole.id, 1).subscribe(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        value => (this.ecole = value)
      );
    }
  }
}
