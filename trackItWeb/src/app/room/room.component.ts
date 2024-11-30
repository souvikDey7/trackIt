import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../app-service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  currentRoute: any;
  createRoom: boolean = false;
  showTable: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private service: RoomService) { }

  ngOnInit(): void {
    this.route.url.subscribe(data =>
      this.currentRoute = data[0].path
    );
    if (this.currentRoute === 'createroom')
      this.createRoom = true;
    else
      this.createRoom = false;
    console.log(this.currentRoute, " ", this.createRoom);
  }

  bufferdata: any = [{
    "userId": "souvik",
    "latitude": "l1",
    "longitude": "l2"
  },
  {
    "userId": "Test",
    "Distance": "23",
    "location": "l2"
  },
  {
    "userId": "dummy",
    "Distance": "08",
    "location": "l2"
  },
  {
    "userId": "TestValue",
    "Distance": "87",
    "location": "l2"
  }
  ];

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async joinRoom() {
    console.log("working", this.showTable);
    //await this.delay(3000);
    this.showTable = !this.showTable;
  }

  msg: any;
  createNewRoom(data: any) {
    if (data.roomId === '' || data.roomId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.service.createRoom(data.roomId, data.password).subscribe
        (data => {
          if (data == "201") {
            this.showTable = !this.showTable;
          }
          else if (data == "409") {
            this.msg = "Room id is not available"
          }
          else if (data == "500") {
            this.msg = "Facing some internal issue"
          }
          else if (data == "400") {
            this.msg = "room id or password must not be blank"
          }
          else {
            this.msg = "Unforeseen circumstances"
          }
        }
        );
    }
  }

  userId: any = "Test";

  joinNewRoom(data: any) {
    if (data.roomId === '' || data.roomId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.service.joinRoom(data.roomId, data.password, this.userId).subscribe
        (data => {
          if (data == "202") {
            this.showTable = !this.showTable;
          }
          else if (data == "204") {
            this.msg = "Room id is not available"
          }
          else if (data == "500") {
            this.msg = "Facing some internal issue"
          }
          else if (data == "401") {
            this.msg = "Credentials is wrong"
          }
          else {
            this.msg = "Unforeseen circumstances"
          }
        }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['back']);
  }
}
