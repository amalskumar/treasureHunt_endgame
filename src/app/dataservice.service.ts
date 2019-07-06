import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Stone {
  id: number;
  stoneName: string;
  teamName: string;
}

export interface IStone {
  Id: number;
  Name: string;
  StoneName: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public stone: Stone;
  stoneNameByid: IStone;

  stoneNameID: IStone[] = [
    { Id: 2629995, Name: 'SoulStone-Yamuna', StoneName: 'Soul Stone' },
    { Id: 9430420, Name: 'SoulStone-M2', StoneName: 'Soul Stone' },
    { Id: 2542540, Name: 'SpaceStone-Yamuna', StoneName: 'Space Stone' },
    { Id: 7154905, Name: 'SpaceStone-M2', StoneName: 'Space Stone' },
    { Id: 6021839, Name: 'PowerStone-Yamuna', StoneName: 'Power Stone' },
    { Id: 5090188, Name: 'PowerStone-M2', StoneName: 'Power Stone' },
    { Id: 3141741, Name: 'MindStone-Yamuna', StoneName: 'Mind Stone' },
    { Id: 7343934, Name: 'MindStone-M2', StoneName: 'Mind Stone' },
    { Id: 5785502, Name: 'TimeStone-Yamuna', StoneName: 'Time Stone' },
    { Id: 5864555, Name: 'TimeStone-M2', StoneName: 'Time Stone' },
    { Id: 3816862, Name: 'RealityStone-Yamuna', StoneName: 'Reality Stone' },
    { Id: 3358725, Name: 'RealityStone-M2', StoneName: 'Reality Stone' },
  ];
  getStoneID(id: number) {
    this.stoneNameByid = this.stoneNameID.find(x => x.Id == id);
    if (this.stoneNameByid) {
      return this.stoneNameByid;
    } else {
      return null;
    }
  } 
  constructor() {
    this.stone = new Stone();
  }

}
