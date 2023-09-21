import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgxFlexboxModule } from '@philipibovo/ngx-flexbox';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxFlexboxModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
