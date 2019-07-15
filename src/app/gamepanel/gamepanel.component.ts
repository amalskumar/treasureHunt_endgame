import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LandingComponent, DialogData } from 'app/landing/landing.component';
@Component({
  selector: 'app-gamepanel',
  templateUrl: './gamepanel.component.html',
  styleUrls: ['./gamepanel.component.scss']
})
export class GamepanelComponent implements OnInit {

desc="Lorem Ipsum has been the industry's standard dummy text ever since the 1500shanged";


  ngOnInit() {
  }


  constructor(
    public dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit(){
    this.dialogRef.close();
  }
}
