import { Component, OnInit } from '@angular/core';
import {DataserviceService, IStone} from '../../dataservice.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
@Component({
  selector: 'app-foundstone',
  templateUrl: './foundstone.component.html',
  styleUrls: ['./foundstone.component.scss']
})
export class FoundstoneComponent implements OnInit {

  constructor(private datastore:DataserviceService,private adalSvc: MsAdalAngular6Service) { }
claimedStone;
  ngOnInit() {
    this.claimedStone=this.datastore.stoneNameByid;
    console.log(this.claimedStone);
    this.adalSvc.acquireToken('<RESOURCE>').subscribe((resToken: string) => {
      console.log(resToken);
    });
    console.log('this.adalSvc.LoggedInUserEmail',this.adalSvc.LoggedInUserEmail)
  }

}
