import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header-footer/header/header.component';
import { FooterComponent } from './header-footer/footer/footer.component';
import { CategoriesMenuComponent } from './header-footer/header/categories-menu/categories-menu.component';
import { ProfileMenuComponent } from './header-footer/header/profile-menu/profile-menu.component';
import { IndexComponent } from './posts/index.component';
import { AuthModule } from './auth/auth.module';
import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesMenuComponent,
    ProfileMenuComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
