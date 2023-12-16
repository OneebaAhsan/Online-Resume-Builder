import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';


registerLocaleData(en);

@NgModule({
declarations: [AppComponent, ResumeBuilderComponent],
imports: [BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NzFormModule, NzSelectModule, NzInputModule, NzSpaceModule],
providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
bootstrap: [AppComponent]
})
export class AppModule {}
