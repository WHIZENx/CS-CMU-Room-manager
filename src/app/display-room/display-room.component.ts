import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-display-room",
  templateUrl: "./display-room.component.html",
  styleUrls: ["./display-room.component.css"]
})
export class DisplayRoomComponent implements OnInit {
  constructor(
    private fServ: FirebaseService,
    private firestore: AngularFirestore
  ) {}

  @Input() room;

  ngOnInit() {}
}
