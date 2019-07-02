import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'app/services/apiservice.service';
export class Register {
    teamName: string;
    teamMember1email: string;
    teamMember2email: string;
    teamMember3email: string;
    teamMember4email: string;
    teamMember5email: string;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
public registerSuccess:boolean=false;
public success:boolean=false;
public signupData;
    registerData: Register;
    registerForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private api: ApiserviceService) {
        this.registerData = new Register();

    }

    ngOnInit() {
   
        this.registerForm = this.formBuilder.group({
            teamNameCtrl: ['', Validators.required],
            teamMember1emailCtrl: ['', [Validators.required, Validators.email]],
            teamMember2emailCtrl: ['', [Validators.email]],
            teamMember3emailCtrl: ['', [Validators.email]],
            teamMember4emailCtrl: ['', [Validators.email]],
            teamMember5emailCtrl: ['', [Validators.email]],
          });
    }

    signUp() {
        if(this.registerForm.valid){
            this.registerData.teamName = this.registerForm.value.teamNameCtrl;
            this.registerData.teamMember1email = this.registerForm.value.teamMember1emailCtrl;
            this.registerData.teamMember2email = this.registerForm.value.teamMember2emailCtrl;
            this.registerData.teamMember3email = this.registerForm.value.teamMember3emailCtrl;
            this.registerData.teamMember4email = this.registerForm.value.teamMember4emailCtrl;
            this.registerData.teamMember4email = this.registerForm.value.teamMember5emailCtrl;
            
            this.api.registerUser(this.registerData).subscribe((data)=> {
                //Show Success...
       
                this.registerSuccess=true;
                if(data){
                    this.signupData=data;
                    if(this.signupData[0].status=='Success'){
                this.success=true;
                    }else{
                this.success=false;

                    }
                }this.success=false;
            }          
            );
        }
    }
}
