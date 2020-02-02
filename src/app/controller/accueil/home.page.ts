import { Component, OnInit } from '@angular/core';

import { CreateF } from '../../models/feedbacks/createF';
import { ListF } from '../../models/feedbacks/ListF';

import { CreateQ } from '../../models/questionnaires/createQ';
import { ListQ } from '../../models/questionnaires/ListQ';

import { CreateC } from 'src/app/models/collaborateur/createC';
import { Collaborateur } from 'src/app/models/collaborateur/collaborateur';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: '../../vue/accueil/home.page.html',
  styleUrls: ['../../vue/accueil/home.page.scss'],
})
export class HomePage implements OnInit{
  
  feedbacksList: CreateF[];
  questionnairesList: CreateQ[];
  collaborateur: CreateC;
  Cid= null;
  constructor(private listF: ListF,
              private listQ: ListQ,
              private col: Collaborateur,
              private Aroute: ActivatedRoute){ 
    
  }
  
  ngOnInit() {
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.collaborateur= this.col.getcollaborateur();
  }
  ionViewWillEnter(){
    //this.collaborateur= this.col.getcollaborateur();
    this.questionnairesList= this.listQ.getquestionnaires();
    this.feedbacksList= this.listF.getfeedbacks();
  }
  
}
