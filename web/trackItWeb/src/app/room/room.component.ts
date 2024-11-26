import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  showTable: boolean = false;
  async joinRoom() {
    console.log("working", this.showTable);
    await this.delay(3000);
    this.showTable = !this.showTable;
  }
}
