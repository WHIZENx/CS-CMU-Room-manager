import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";

import { environment } from "./environment";
import { AngularFireModule } from "@angular/fire";

import { FirebaseService } from "./firebase.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DisplayRoomComponent } from "./display-room/display-room.component";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-db.service";
import { UserService } from "./user.service";
import { UserdbService } from "./userdb.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "home", component: HomeComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayRoomComponent,
    UserComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    FirebaseService,
    AngularFirestore,
    InMemoryDataService,
    UserService,
    UserdbService
  ]
})
export class AppModule {}
