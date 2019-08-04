import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  users: User[];

  constructor(private userService: UserService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  async invalidUserAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Email or Password',
      message: 'Username or Password does is not valid.',
      buttons: ['Okay']
    });

    await alert.present();
  }

  login(form: { email: string; password: string; }) {
    console.log (this.email, this.password);
    const loginUser = this.users.find((user) => {
      return user.email === this.email && user.password === this.password;
    });

    if (!loginUser) {
      this.invalidUserAlert();
      return;
    }
    this.router.navigate(['./', 'home']);
  }

}
