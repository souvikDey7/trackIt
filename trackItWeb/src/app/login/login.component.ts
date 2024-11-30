import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flag: boolean = false;

  constructor(private router: Router) {
    this.flag = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/joinroom' || event.url === '/createroom' || event.url==="/back") {
          this.flag = true;
        }
      }
    });
  }

  createRoom() {
    this.router.navigate(['createroom']);
  }

  joinRoom() {
    this.router.navigate(['joinroom']);
  }

  hide() {
    this.flag = true;
  }
}
