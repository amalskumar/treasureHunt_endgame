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
    { Id: 2629995, Name: 'Soul Stone - Yamuna', StoneName: 'Soul Stone' },
    { Id: 9430420, Name: 'Soul Stone  - M2', StoneName: 'Soul Stone' },
    { Id: 2542540, Name: 'Space Stone  - Yamuna', StoneName: 'Space Stone' },
    { Id: 7154905, Name: 'Space Stone  - M2', StoneName: 'Space Stone' },
    { Id: 6021839, Name: 'Power Stone - Yamuna', StoneName: 'Power Stone' },
    { Id: 5090188, Name: 'Power Stone  - M2', StoneName: 'Power Stone' },
    { Id: 3141741, Name: 'Mind Stone  - Yamuna', StoneName: 'Mind Stone' },
    { Id: 7343934, Name: 'Mind Stone  - M2', StoneName: 'Mind Stone' },
    { Id: 5785502, Name: 'Time Stone - Yamuna', StoneName: 'Time Stone' },
    { Id: 5864555, Name: 'Time Stone  - M2', StoneName: 'Time Stone' },
    { Id: 3816862, Name: 'Reality Stone  - Yamuna', StoneName: 'Reality Stone' },
    { Id: 3358725, Name: 'Reality Stone  - M2', StoneName: 'Reality Stone' },
  ];

  constructor() {
    this.stone = new Stone();
  }

}
