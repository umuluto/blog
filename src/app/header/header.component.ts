import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() main = false;

  protected isLogin = this.route.component === LoginComponent;
  protected isRegister = this.route.component === RegisterComponent;

  protected auth$ = this.authService.auth$;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  protected onLogout() {
    this.authService.logout().subscribe();
  }
}
