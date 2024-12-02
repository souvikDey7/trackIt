import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoomService } from './app-service';
import { SeasionStorageService } from './seasion-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Track It';
  flag: boolean = false;
  login = true;
  constructor(private router: Router, private service: RoomService,private session: SeasionStorageService) {
    this.login = true;
    this.flag = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/joinroom' || event.url === '/createroom' || event.url === '/start' || event.url === "/back") {
          this.flag = true;
        }
        else{
          this.session.logout();
        }
      }
    });
  }

  msg: any;

  signIn(data: any) {
    if (data.userId === '' || data.userId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.showLoading();
      this.service.signin(data.userId, data.password).subscribe
        (data => {
          this.hideLoading();
          console.log("data",data);
          if (data == "200") {
            this.flag = true;
            this.router.navigate(['start']);
          }
          else if (data == "302") {
            this.msg = "Usarname is not available"
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

  logIn(data: any) {
    if (data.userId === '' || data.userId == null) {
      this.msg = "Required field"
    }
    else if (data.password === '' || data.password == null) {
      this.msg = "Required field"
    }
    else {
      this.showLoading();
      this.service.login(data.userId, data.password).subscribe
        (data => {
          console.log(data);
            
          this.hideLoading();
          if (data == "200") {
            this.flag = true;
            this.router.navigate(['start']);
          }
          else if (data == "204") {
            this.msg = "Usarname is not available"
          }
          else if (data == "500") {
            this.msg = "Facing some internal issue"
          }
          else if (data == "401") {
            this.msg = "Wrong credential"
          }
          else {
            this.msg = "Unforeseen circumstances"
          }
        }
        );
    }
  }

  loginPage() {
    this.login = !this.login;
    this.msg = "";
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loading: boolean = false;
  async showLoading() {
    this.loading = true;
    await this.delay(7000);
    this.msg="High traffic!!! try again"
    this.hideLoading();
  }

  hideLoading() {
    this.loading = false;
  }
}
