import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MyRemindersPage, ReminderDetailPage } from '../pages/pages';
import { ReminderStorage, CalendarService } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    MyRemindersPage,
    ReminderDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    ReminderStorage,
    CalendarService,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
