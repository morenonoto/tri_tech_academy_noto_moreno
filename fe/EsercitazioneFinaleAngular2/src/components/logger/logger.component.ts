import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.css'
})
export class LoggerComponent {
  constructor(private fb: FormBuilder, private userService: UserService, private mainService: MainService) {}

  faxmark = faXmark;

  user!: User;

  valid!: Boolean;

  open!: Boolean;


  userLogIn: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })



  access() {
    this.userService.userCheck(this.userLogIn.value.email, this.userLogIn.value.password).subscribe(response => {

      this.valid = response

      if(this.valid) {
        this.userService.userByEmail(this.userLogIn.value.email).subscribe(user => {
          this.user = user;

          this.mainService.logIn(this.user);
        })
      }
      else if(!this.valid) {
        this.open = true;
      }
  })

  }


  close() {
    this.open = false;
  }


}
