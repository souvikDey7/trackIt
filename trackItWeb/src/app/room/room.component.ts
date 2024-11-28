import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  currentRoute: any;
  createRoom: boolean = false;
  showTable: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.url.subscribe(data =>
      this.currentRoute = data[0].path
    );
    if (this.currentRoute === 'createroom')
      this.createRoom = true;
    else
      this.createRoom = false;
    console.log(this.currentRoute," ",this.createRoom);
  }

  bufferdata: any = [{
    "userId": "souvik",
    "latitude": "l1",
    "longitude": "l2"
  },
  {
    "userId": "5",
    "Distance": "23",
    "location": "l2"
  },
  {
    "userId": "u4",
    "Distance": "08",
    "location": "l2"
  },
  {
    "userId": "u3",
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

  goBack(): void {
    this.router.navigate(['back']); 
  }
}
