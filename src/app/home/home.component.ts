import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  permission;

  constructor(
    private udServ: UserService,
    private route: Router,
    private fServ: FirebaseService
  ) {}

  room;
  booking;
  isStaff;

  todate = new Date();

  user_permission = "";

  book_str;
  detail_room;

  ngOnInit() {
    this.fServ.getRoom("classroom").subscribe(val => {
      this.room = val.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {})
        };
      });
    });
    this.udServ.refreshLang();
    this.user_permission = localStorage.getItem("permission");
    if (this.user_permission == "staff") {
      this.permission = false;
      this.booking_con = true;
      this.isStaff = true;
      this.book_str = "จัดการจองห้อง";
      this.detail_room = "จัดการจอง ณ วันที่";
    } else {
      this.permission = false;
      this.booking_con = true;
      this.isStaff = false;
      this.book_str = "ดูห้องว่าง";
      this.detail_room = "ดูการจอง ณ วันที่";
    }
  }

  booking_con = true;

  changeBook() {
    if (!this.booking_con) {
      this.booking_con = true;
      this.permission = false;
      this.table = false;
    }
  }

  changePermis() {
    if (!this.permission) {
      this.booking_con = false;
      this.permission = true;
      this.table = false;
    }
  }

  table = false;
  date_show;

  room_table;
  map_table = {};
  map_room = {};
  str_date = "";

  showTable() {
    if ($("#datepick").val() != "") {
      this.map_room = {};
      this.table = true;
      var time = $("#datepick")
        .val()
        .split("-");
      var day = time[2];
      var month = time[1];
      var year = time[0];
      this.date_show = day + "/" + month + "/" + year;
      this.fServ.getRoom("classroom").subscribe(val => {
        this.room_table = val.map(e => {
          for (let i = 0; i < e.payload.doc.data()["booking"].length; i++) {
            var date_db = new Date(
              e.payload.doc.data()["booking"][i].seconds * 1000
            );
            this.str_date = "";
            this.str_date += date_db.getFullYear() + "-";
            if (date_db.getMonth() + 1 < 10) this.str_date += "0";
            this.str_date += date_db.getMonth() + 1 + "-";
            if (date_db.getDate() < 10) this.str_date += "0";
            this.str_date += date_db.getDate();
            if ($("#datepick").val() == this.str_date) {
              if (this.map_table[$("#datepick").val()] === undefined)
                this.map_table[$("#datepick").val()] = 1;
              else this.map_table[$("#datepick").val()] += 1;
            }
          }
          this.map_room[e.payload.doc.data()["roomname"]] = this.map_table;
          this.map_table = {};
          if (
            this.map_room[e.payload.doc.data()["roomname"]][
              $("#datepick").val()
            ] == 8
          ) {
            $("#" + e.payload.doc.data()["roomname"]).css({
              background: "#ff7675"
            });
            $("#" + e.payload.doc.data()["roomname"]).attr("data-target", "");
            $("#" + e.payload.doc.data()["roomname"]).css("cursor", "default");
          } else {
            $("#" + e.payload.doc.data()["roomname"]).css({
              background: "#78e08f"
            });
            $("#" + e.payload.doc.data()["roomname"]).attr(
              "data-target",
              "#editDateModal"
            );
            $("#" + e.payload.doc.data()["roomname"]).css("cursor", "pointer");
          }
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {})
          };
        });
      });
    }
  }

  room_name;
  detail;
  booking_time;

  room_today = [];

  you_book = [];

  selectRoom(room_name) {
    this.you_book = [];
    for (let i = 0; i < 8; i++) {
      $("#" + i).css({ background: "#78e08f" });
      if (this.isStaff) $("#" + i).css({ cursor: "pointer" });
    }
    this.room_name = room_name;
    this.fServ.getRoomDetail(room_name).subscribe(val => {
      this.detail = val.map(e => {
        this.booking_time = e.payload.doc.data()["booking"];
        for (let i = 0; i < this.booking_time.length; i++) {
          var date_db = new Date(
            e.payload.doc.data()["booking"][i].seconds * 1000
          );
          this.str_date = "";
          this.str_date += date_db.getFullYear() + "-";
          if (date_db.getMonth() + 1 < 10) this.str_date += "0";
          this.str_date += date_db.getMonth() + 1 + "-";
          if (date_db.getDate() < 10) this.str_date += "0";
          this.str_date += date_db.getDate();
          if (
            new Date($("#datepick").val()).getTime() ==
            new Date(this.str_date).getTime()
          ) {
            var date = new Date(date_db);

            var index_time =
              parseInt(date.toLocaleTimeString().split(":")[0]) - 8;
            $("#" + index_time).css({ background: "#ff7675" });
            $("#" + index_time).css({ cursor: "default" });
          }
        }
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {})
        };
      });
    });
  }

  addbooktime(id) {
    if (!this.isStaff) return false;
    var str_id = "";
    if (id + 15 < 10) str_id += "0";
    str_id += id + 15;
    var time = this.date_show.split("/");
    var date = new Date(
      time[2] + "-" + time[1] + "-" + time[0] + " " + str_id + ":00"
    );
    if (
      this.hexc($("#" + id).css("background-color")) != "#ff7675" &&
      this.hexc($("#" + id).css("background-color")) != "#ffeeba"
    ) {
      $("#" + id).css({ background: "#ffeeba" });
      $("#" + id).css({ cursor: "default" });
      this.you_book.push(date);
    }
  }

  booking_db(id) {
    for (let i = 0; i < this.you_book.length; i++) {
      var temp = new Date(this.you_book[i]);
      this.fServ.addbookingRoom(
        id,
        new Date(temp.setHours(temp.getHours() - 7))
      );
    }
  }

  hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete parts[0];
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = "0" + parts[i];
    }
    return "#" + parts.join("");
  }

  number = 0;
  condition = "";
  roomname = "";

  add() {
    let data = {
      booking: [],
      number: this.number,
      condition: this.condition,
      roomname: this.roomname
    };
    this.fServ.addRoom(this.roomname, data);
  }

  room_number;
  room_number_2;
  room_condition;
  room_condition_2;

  edit_room = false;

  editroom() {
    this.edit_room = true;
  }

  seeroom(roomname) {
    this.edit_room = false;
    this.room_name = roomname;
    this.fServ.getRoomDetail(roomname).subscribe(val => {
      val.map(e => {
        this.room_number = e.payload.doc.data()["number"];
        this.room_number_2 = e.payload.doc.data()["number"];
        this.room_condition = e.payload.doc.data()["condition"];
        this.room_condition_2 = e.payload.doc.data()["condition"];
        if (this.room_condition == "") {
          this.room_condition = "ไม่มี";
        }
      });
    });
  }

  edit_suc() {
    this.fServ.updateRoom(
      this.room_name,
      this.room_condition_2,
      this.room_number_2
    );
  }
}
