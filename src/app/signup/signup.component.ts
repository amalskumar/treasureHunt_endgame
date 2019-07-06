import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'app/services/apiservice.service';
import {Router} from "@angular/router";


export class Register {
    teamName: string;
    teamMember1email: string;
    teamMember2email: string;
    teamMember3email: string;
    teamMember4email: string;
    teamMember5email: string;
}

export class Response {
    status: string;
    message: string;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public registerSuccess = false;
    public success = false;
    public signupData;
    registerData: Register;
    registerForm: FormGroup;
    isFormValid = true;
    constructor(private formBuilder: FormBuilder, private api: ApiserviceService, private router:Router) {
        this.registerData = new Register();

    }

    ngOnInit() {
       


        this.registerForm = this.formBuilder.group({
            teamNameCtrl: ['', Validators.required],
            teamMember1emailCtrl: ['', [Validators.required,
            Validators.email,
            Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+hrblock.com$')]],
            teamMember2emailCtrl: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+hrblock.com$')]],
            teamMember3emailCtrl: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+hrblock.com$')]],
            teamMember4emailCtrl: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+hrblock.com$')]],
            teamMember5emailCtrl: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+hrblock.com$')]],
        });
    }

    signUp() {
        if (this.registerForm.valid) {
            this.isFormValid = true;
            this.registerData.teamName = this.registerForm.value.teamNameCtrl;
            this.registerData.teamMember1email = this.registerForm.value.teamMember1emailCtrl;
            this.registerData.teamMember2email = this.registerForm.value.teamMember2emailCtrl;
            this.registerData.teamMember3email = this.registerForm.value.teamMember3emailCtrl;
            this.registerData.teamMember4email = this.registerForm.value.teamMember4emailCtrl;
            this.registerData.teamMember5email = this.registerForm.value.teamMember5emailCtrl;
            this.api.registerUser(this.registerData).subscribe((data: Response) => {
                this.registerSuccess = true;
                if (data) {
                    this.signupData = data;
                    if (data.status == 'Success') {
                        this.success = true;
                    } else {
                        this.success = false;
                    }
                } else {
                    this.success = false;
                }
            }
            );
        }else {
            this.isFormValid = false;
        }
    }




    redirectRules(){
        this.router.navigate(['/rules'])
    }
}
