import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Track It';
  flag: boolean = false;
  login = true;
  constructor(private router: Router) {
    this.login = true;
  }

  ngOnInit(): void { }

  msg: any;
  createRoom() {
    this.router.navigate(['createroom']);
  }

  joinRoom() {
    this.router.navigate(['joinroom']);
  }

  loginPage() {
    this.login = !this.login;
  }
}
