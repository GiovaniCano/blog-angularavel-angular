import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './posts/index.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthModule } from './auth/auth.module';
import { SessionExpiredInterceptor } from './auth/guards/session-expired.interceptor';
import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';
import { LayoutModule } from './layout/layout.module';
import { EditUserInfoComponent } from './user/edit-user-info/edit-user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from './forms-extensions/forms-extensions.module';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotFoundComponent,
    EditUserInfoComponent,
    UserProfileComponent,
    UpdatePasswordComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsExtensionsModule,
    
    AuthModule,
    LayoutModule,
    
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SessionExpiredInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
