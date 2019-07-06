import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import {DataserviceService, IStone} from '../dataservice.service'
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import {Router} from "@angular/router";

@Component({
  selector: 'app-claimpoint',
  templateUrl: './claimpoint.component.html',
  styleUrls: ['./claimpoint.component.scss']
})
export class ClaimpointComponent implements OnInit {
 public entityId;
 public selctedStoneDetails;
 public stoneAvailability=true;
stone:IStone;
  constructor(private router: Router,private route:ActivatedRoute,private dataservice:DataserviceService,private adalSvc: MsAdalAngular6Service) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.entityId = params.get('id');
      this.findStoneOpen();
    }); 
  }
  findStoneOpen(){
this.selctedStoneDetails=this.dataservice.getStoneID(this.entityId);
console.log("this.selctedStoneDetails",this.selctedStoneDetails)
  }
  redirectRegister(){
    this.router.navigate(['/signup'])
  }
  redirectClaim(){
    this.router.navigate(['/claim-stone'])
  }
}
