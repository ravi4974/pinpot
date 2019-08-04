import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    gender: 'M',
    id: 'U1'
  };
  confirm: string;

  constructor(private userService: UserService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async passwordDoesNotMatchAlert() {
    const alert = await this.alertController.create({
      header: 'Password does not match',
      message: 'Password provided does not match.',
      buttons: ['Okay']
    });

    await alert.present();
  }

  register() {
    if (this.confirm !== this.user.password) {
      this.passwordDoesNotMatchAlert();
      return;
    }
    this.router.navigate(['/tabs/maps']);
  }

}
