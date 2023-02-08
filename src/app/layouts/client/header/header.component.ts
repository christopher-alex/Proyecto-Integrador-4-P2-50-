import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  currentUser = {} as User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      if (res) {
        this.router.navigate(['/layout']);
      }
    });
  }
}
