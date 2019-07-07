import { ApiserviceService } from 'app/services/apiservice.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Points } from './claimpoint/foundstone/foundstone.component';

export class Stone {
  id: number;
  stoneName: string;
  teamName: string;
}

export interface IStoneVO {
  available: boolean;
  taken: boolean;
  invalid: boolean;
  stoneName: string;
}

export interface IStatus {
  status: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public stone: Stone;
  itemValue = new Subject();
  claimID;

  constructor() {
    this.stone = new Stone();
  }

  setItem(value: Points) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('teamData', JSON.stringify(value));
  }

  getItem() {
    return JSON.parse(localStorage.getItem('teamData'));
  }

  removieItem() {
    localStorage.removeItem('teamData');
  }

  getcliamPointID() {
    return JSON.parse(localStorage.getItem('claimStone'));
  }
  setcliamPointID(stone: Stone) {
    localStorage.setItem('claimStone', JSON.stringify(stone));
  }
  removeClaimPointID() {
    localStorage.removeItem('claimStone');
  }


}



