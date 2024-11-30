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
 
  createNewRoom(data:any) {
    this.service.createRoom(data.roomId, data.password).subscribe
      (data =>
        console.log(data))
  }
  
  goBack(): void {
    this.router.navigate(['back']);
  }
}
