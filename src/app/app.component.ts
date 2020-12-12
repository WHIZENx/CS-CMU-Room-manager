import { Component } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  username;
  constructor(private route: Router, private udServ: UserService) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.udServ.refreshLang();
  }

  logout() {
    this.udServ.logout();
    this.username = localStorage.getItem("username");
    this.udServ.refreshLang();
    this.route.navigate([""]);
  }
}
