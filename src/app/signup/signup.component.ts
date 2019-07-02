import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

    registerData: Register;
    registerForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.registerData = new Register();

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            teamNameCtrl: ['', Validators.required],
            teamMember1emailCtrl: ['', Validators.required],
            teamMember2emailCtrl: ['', Validators.required],
            teamMember3emailCtrl: ['', Validators.required],
            teamMember4emailCtrl: ['', Validators.required],
            teamMember5emailCtrl: ['', Validators.required],
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
            
        }
    }
}
