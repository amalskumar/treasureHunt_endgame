import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
export class Register{
    teamName:string;
    teamMember1email:string;
    teamMember2email:string;
    teamMember3email:string;
    teamMember4email:string;
    teamMember5email:string;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    registerData: Register;
    registerForm:  FormGroup;
    constructor(private formBuilder: FormBuilder) { 
        this.registerData = new Register();

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            { teamNameCtrl: this.formBuilder.control('', [Validators.required, Validators.email]),
            teamMember1EmailCtrl: this.formBuilder.control('', [Validators.required, Validators.email]),
            teamMember2EmailCtrl: this.formBuilder.control('', [Validators.email]),
            teamMember3EmailCtrl: this.formBuilder.control('', [Validators.email]),
            teamMember4EmailCtrl: this.formBuilder.control('', [Validators.email]),
            teamMember5EmailCtrl: this.formBuilder.control('', [Validators.email]),
            }
        )
    }

    signUp(){
        this.registerData.teamName = this.registerForm.value.teamNameCtrl;
        console.log(this.registerData.teamName);
    }
}
