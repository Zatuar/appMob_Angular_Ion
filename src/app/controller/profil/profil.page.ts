import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/models/collaborateur/collaborateur';
import { CreateC } from 'src/app/models/collaborateur/createC';

@Component({
  selector: 'app-profil',
  templateUrl: '../../vue/profil/profil.page.html',
  styleUrls: ['../../vue/profil/profil.page.scss'],
})
export class ProfilPage implements OnInit {
  collaborateur: CreateC;
  constructor(private col: Collaborateur) {
    
  }
  
  ngOnInit() {
    this.collaborateur= this.col.getcollaborateur();
  }

}