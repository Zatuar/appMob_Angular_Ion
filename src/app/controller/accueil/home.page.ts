import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { CreateF } from '../../models/feedbacks/createF';
import { ListF } from '../../models/feedbacks/ListF';
import { ListQ } from '../../models/questionnaires/ListQ';
import { CreateC } from 'src/app/models/collaborateur/createC';
import { Collaborateur } from 'src/app/models/collaborateur/collaborateur';
import { Questionnaires } from 'src/app/models/questionnaires/questionnaire';


@Component({
  selector: 'app-home',
  templateUrl: '../../vue/accueil/home.page.html',
  styleUrls: ['../../vue/accueil/home.page.scss'],
})

export class HomePage implements OnInit{
  //Variables
  Cid: any;//récupérer l'ID pour faire les appel à la BdD
  feedbacksList: CreateF[];
  questionnairesList: Questionnaires[];
  collaborateur: CreateC;

  constructor(private listF: ListF,
              private listQ: ListQ,
              private col: Collaborateur,
              private Aroute: ActivatedRoute,
              private nav: NavController){ 
    
  }
  
  ngOnInit() {
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.collaborateur= this.col.getcollaborateur();
  }

  ionViewWillEnter(){
    this.questionnairesList= this.listQ.getquestionnaires();
    this.feedbacksList= this.listF.getfeedbacks();
  }

  goToFeedbacks(){
    this.nav.navigateForward("/feedbacks");
  }

  goToProfil(){
    this.nav.navigateForward("/profil");
  }

  goToQuestionnaires(){
    this.nav.navigateForward("/questionnaires/"+this.collaborateur.id+"/"+this.collaborateur.role);
  }

  goToAnsweringQ(Qid:number){
    this.nav.navigateForward("/qanswering/"+this.collaborateur.id+"/"+Qid);
  }
  
}
