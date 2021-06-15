import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'app/entities/candidature/candidature.service';
import { UserService } from 'app/entities/user/user.service';
import { CandidatService } from 'app/entities/candidat/candidat.service';
import { EcoleService } from 'app/entities/ecole/ecole.service';
import { ResponsableService } from 'app/entities/responsable/responsable.service';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  users: any;
  candidat: any;
  ecoleNonActivated: any;
  ecoleActivated: any;
  respoNonAssigned: any;
  respoAssigned: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private candidatureService: CandidatureService,
    private userService: UserService,
    private candidatService: CandidatService,
    private ecoleService: EcoleService,
    private responsableService: ResponsableService
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method,@typescript-eslint/no-empty-function

  ngOnInit(): void {
    this.responsableService.countAssigned().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.respoAssigned = value)
    );
    this.responsableService.countNonAssigned().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.respoNonAssigned = value)
    );
    this.ecoleService.activatedSchool().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.ecoleActivated = value)
    );
    this.ecoleService.nonActivatedSchool().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.ecoleNonActivated = value)
    );
    this.candidatService.count().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.candidat = value)
    );
    this.userService.countAll().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      value => (this.users = value)
    );
    this.candidatureService.getStats().subscribe(value => {
      this.basicData = {
        labels: value.data,
        datasets: [
          {
            label: 'Candidatures',
            backgroundColor: '#42A5F5',
            data: value.value,
          },
        ],
      };
      this.basicOptions = {
        legend: {
          labels: {
            fontColor: '#030315',
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: '#030315',
              },
              gridLines: {
                color: 'rgba(255,255,255,0.2)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: '#030315',
              },
              gridLines: {
                color: 'rgba(255,255,255,0.2)',
              },
            },
          ],
        },
      };
    });
  }
}
