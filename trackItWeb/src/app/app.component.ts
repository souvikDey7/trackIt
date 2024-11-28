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
