import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private fServ: FirebaseService) {}

  room;
  booking;

  ngOnInit() {
    this.fServ.getRoom("classroom").subscribe(val => {
      this.room = val.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {})
        };
      });
    });
  }
}
