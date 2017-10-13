import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MyRemindersPage, ReminderDetailPage } from '../pages/pages';
import { SQLite } from '@ionic-native/sqlite';
import { ReminderStorage } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    MyRemindersPage,
    ReminderDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyRemindersPage,
    ReminderDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    ReminderStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
