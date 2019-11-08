import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import {AuthService} from './auth.service';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatGridListModule } from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';
import * as AllIcons from '@ant-design/icons-angular/icons';
//import { NzDemoModalBasicComponent } from './app.component';
// import { Layout, Menu, Icon } from 'antd';
// const { Header, Content, Footer, Sider } = Layout;
import { IconDefinition } from '@ant-design/icons-angular';
import { FilterPipe } from './filter.pipe';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(en);

//import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    AdminComponent,
    UserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    NgZorroAntdModule,
    HttpClientModule,
    NgZorroAntdModule,
    NzInputModule,
    DragDropModule,
    ScrollingModule,
    NzLayoutModule
    // UserComponent
  ],
  exports:[MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    // UserComponent  
  ],
  providers: [AuthService,AuthGuard, { provide: NZ_I18N, useValue: en_US },{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ],
  bootstrap: [AppComponent],
  entryComponents:[UserComponent]
})
export class AppModule { }
