import { Component } from '@angular/core';
import { CreateC } from 'src/app/models/collaborateur/createC';
import { Collaborateur } from 'src/app/models/collaborateur/collaborateur';
import { verifyHostBindings } from '@angular/compiler';
import { ToastController, NavController } from '@ionic/angular';

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
  

  constructor(private nav: NavController) {

  }

  identification() {
    if(this.personne.id!='' && this.personne.password!=''){
      if(this.connexionVerification()){
        alert("Connexion made");
        this.nav.navigateForward("/home/"+this.personne.id);
      }else{
        alert("Connexion failed");
      }
    }else{
      alert("Connexion failed");
    }
  }
  
  connexionVerification():boolean{
    //vérification de la connection
    return true;
  }

  forgotPassword(){
    alert("I forgot my password");
    /**
     * redirection sur la page de réinitialisation
     * de mot de passe
     */
  }
  
}