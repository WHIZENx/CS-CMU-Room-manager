import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getRoom(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  getRoomDetail(id: string) {
    return this.firestore
      .collection("classroom", ref => ref.where("roomname", "==", id).limit(1))
      .snapshotChanges();
  }

  updateRoom(id: string, condition, number) {
    return this.firestore
      .collection("classroom")
      .doc(id)
      .update({ condition: condition, number: number });
  }

  addbookingRoom(id: string, book) {
    return this.firestore
      .collection("classroom")
      .doc(id)
      .update({ booking: firebase.firestore.FieldValue.arrayUnion(book) });
  }

  addRoom(id: string, data) {
    return this.firestore
      .collection("classroom")
      .doc(id)
      .set(data);
  }

}
