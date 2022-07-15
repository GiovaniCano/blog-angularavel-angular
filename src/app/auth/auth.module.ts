import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from '../forms-extensions/forms-extensions.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [  
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule,
    RouterModule
  ]
})
export class AuthModule { }
