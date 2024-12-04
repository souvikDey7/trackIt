import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../app-service';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription, timer } from 'rxjs';
import { getDistance } from 'geolib';
import { switchMap } from 'rxjs/operators';

interface UserLocation {
  userId: string;
  latitude: number;
  longitude: number;
}

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
    this.loading = false;
    this.route.url.subscribe(data =>
      this.currentRoute = data[0].path
    );
    if (this.currentRoute === 'createroom')
      this.createRoom = true;
    else
      this.createRoom = false;
  }

  bufferdata: UserLocation[] = [];

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  msg: any;
  createNewRoom(data: any) {
    let roomId = data.roomId;
    if (data.roomId === '' || data.roomId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.showLoading();
      this.service.createRoom(data.roomId, data.password).subscribe
        (data => {
          this.hideLoading();
          if (data == "201") {
            this.startPolling(roomId);
            this.showTable = !this.showTable;
            this.service.sendLocation();
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
          else if (data == "401") {
            this.msg = "Unauthorized, Login again"
          }
          else {
            this.msg = "Unforeseen circumstances"
          }
        }
        );
    }
  }

  joinNewRoom(data: any) {
    let roomId = data.roomId;
    if (data.roomId === '' || data.roomId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.showLoading();
      this.service.joinRoom(data.roomId, data.password).subscribe
        (data => {
          this.hideLoading();
          if (data == "202") {
            this.service.sendLocation();
            this.showTable = !this.showTable;
            this.startPolling(roomId);
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

  showTableData(roomId: String): void {
    this.service.getTable(roomId).subscribe((data) => {
      this.bufferdata = JSON.parse(data.toString());
      console.log(this.bufferdata);
    });
  }

  private pollingSubscription: Subscription | null = null;

  startPolling(roomId: string): void {
    if (!this.pollingSubscription) {
      this.pollingSubscription = timer(0, 60000) // Start immediately, repeat every 660 seconds
        .pipe(
          switchMap(() => this.service.getTable(roomId)) // API call on each interval
        )
        .subscribe({
          next: (response) => {
            this.bufferdata = JSON.parse(response.toString());
            this.getCord(this.bufferdata);
          },
          error: (error) => {
            console.error('Polling error:', error); // Handle errors
          },
        });
    }
  }

  ulat: number = 0;
  ulon: number = 0;
  getCord(bufferdata: UserLocation[]) {
    const currentUser = sessionStorage.getItem("userName");
    bufferdata.forEach((element) => {
      if (element.userId === currentUser) {
        this.ulat = element.latitude;
        this.ulon = element.longitude;
      }
    });
  }

  calculateDistanceWithGeolib(lat2: number, lon2: number): number {
    const distance = getDistance(
      { latitude: this.ulat, longitude: this.ulon },
      { latitude: lat2, longitude: lon2 }
    );
    return distance / 1000;
  }

  goBack(): void {
    this.msg = "";
    this.router.navigate(['back']);
  }

  loading: boolean = false;
  async showLoading() {
    this.loading = true;
    /*await this.delay(7000);
    this.msg = "High traffic!!! wait few moment"
    this.hideLoading();*/
  }

  hideLoading() {
    this.loading = false;
  }
  
  openInMap(latitude: any,longitude:any) {
    this.service.openInMap(latitude, longitude);
  }
}
