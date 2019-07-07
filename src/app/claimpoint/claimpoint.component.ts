import { IStoneVO } from './../dataservice.service';
import { ApiserviceService } from './../services/apiservice.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { DataserviceService, Stone } from '../dataservice.service'
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claimpoint',
  templateUrl: './claimpoint.component.html',
  styleUrls: ['./claimpoint.component.scss']
})
export class ClaimpointComponent implements OnInit {
  public entityId;
  public selctedStoneDetails;
  public stoneName;
  public stone: Stone;
  public stoneAvailability = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiservice: ApiserviceService,
    private adalSvc: MsAdalAngular6Service,
    private dataService: DataserviceService) {
    this.stone = new Stone();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.entityId = params.get('id');
      this.findStoneOpen();
    });
  }

  ngOnInit() {
  }

  findStoneOpen() {
    this.apiservice.getStoneAvailable(this.entityId).subscribe((data: IStoneVO) => {
      if (data.available) {
        this.stoneAvailability = true;
        this.stone.stoneName = data.stoneName;
        this.stone.id = this.entityId;
        this.stoneName = data.stoneName;
        this.dataService.setcliamPointID(this.stone);
      } else if (data.taken) {
        this.stoneAvailability = false;
        this.stoneName = data.stoneName;
      } else {
        this.stoneAvailability = false;
        this.redirectToHome();
      }
    }, (error) => {
      this.redirectToHome();
    });
  }


  redirectToHome() {
    this.router.navigate(['/home'])
  }

  redirectRegister() {
    this.router.navigate(['/signup'])
  }
  redirectClaim() {
    this.router.navigate(['/claim-stone'])
  }
}
