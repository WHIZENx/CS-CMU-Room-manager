import { Component, OnInit } from "@angular/core";
import { Users } from "../users";
import { UserService } from "../user.service";
import { UserdbService } from "../userdb.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username;
  password;

  user: Users[];

  constructor(
    private udServ: UserService,
    private route: Router,
    private uServ: UserdbService
  ) {}

  url;

  ngOnInit() {
    if (
      localStorage.getItem("username") != undefined &&
      localStorage.getItem("username") != "null"
    ) {
      this.route.navigate(["home"]);
    }
  }

  check() {
    this.url = window.location.href + "/home";
    this.uServ.getUsers().subscribe(e => {
      for (let i = 0; i < e.length; i++) {
        if (
          e[i]["username"] == this.username &&
          e[i]["password"] == this.password
        ) {
          this.udServ.login(this.username, e[i]["permission"]);
          window.location = <any>this.url;
        }
      }
    });
  }
}
