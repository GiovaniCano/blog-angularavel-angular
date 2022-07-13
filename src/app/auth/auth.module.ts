import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from '../forms-extensions/forms-extensions.module';



@NgModule({
  declarations: [  
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule
  ]
})
export class AuthModule { }
