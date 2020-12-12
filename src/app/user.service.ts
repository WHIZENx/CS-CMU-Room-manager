import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public username = new Subject<string>();
  public permission = new Subject<string>();
  private callLangSource = new Subject<any>();

  callLang = this.callLangSource.asObservable();

  login(username, permission) {
    localStorage.setItem("username", username);
    localStorage.setItem("permission", permission);
    this.username.next(username);
    this.permission.next(permission);
  }

  logout() {
    localStorage.setItem("username", null);
    localStorage.setItem("permission", null);
    this.username.next();
    this.permission.next();
  }

  refreshLang() {
    this.callLangSource.next();
  }

  constructor() {}
}
