import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Collaborateur } from 'src/app/models/collaborateur/collaborateur';

@Component({
  selector: 'app-login',
  templateUrl: '../../vue/login/login.page.html',
  styleUrls: ['../../vue/login/login.page.scss'],
})

export class LoginPage {

  personne ={
    id: '',
    password: ''
  };
  A: AngularFireAuth;
  

  constructor(private nav: NavController,
              private col: Collaborateur,
              private fireauth: AngularFireAuth,
              private presentToast:ToastController,
              private http : HttpClient) {

  }

  login(){
    this.fireauth.auth.signInWithEmailAndPassword(this.personne.id,this.personne.password)
    .then(res => {
      if (res.user) {
        console.log(res.user);
        this.http.post('http://localhost:5000/get_profile',this.personne.id)
    .pipe(map(res => res))
    .subscribe(data => {
      console.log(status);
      console.log(data);
      this.col.setfeedbacks(data);
    });
        this.nav.navigateForward("/home/"+this.personne.id);
      }
    })
    .catch(err => {
      console.log(`login failed ${err}`);
    });
  }

  identification() {
    if(this.personne.id!='' && this.personne.password!=''){
      console.log("Connexion made");
      this.login();
      
      this.showToast('Connected');
    }else{
      this.showToast('Email or Password is missing');
    }
  }

  forgotPassword(){
    /**
     * redirection sur la page de réinitialisation
     * de mot de passe
     */
    if(this.personne.id!=''){
      this.fireauth.auth.sendPasswordResetEmail(this.personne.id)
      .then(data => {
        console.log(data);
        this.showToast('Password reset email sent');
        this.nav.navigateForward("/login");
      })
      .catch(err => {
        console.log(` failed ${err}`);
      });
    }
    else{
      this.showToast('Write your email adress first');
    }
    
  }
  showToast(Tmessage: string) {
    this.presentToast.create({
      message: Tmessage,
      duration: 2000,
      animated: true,
      showCloseButton: true,
      closeButtonText: "OK",
      position: "bottom"
    }).then((obj) => {
      obj.present();
    });
  }
  
}