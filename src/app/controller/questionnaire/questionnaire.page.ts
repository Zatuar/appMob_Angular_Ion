import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { ListQ } from 'src/app/models/questionnaires/ListQ';
import { Questionnaires } from 'src/app/models/questionnaires/questionnaire';

@Component({
  selector: 'app-questionnaire',
  templateUrl: '../../vue/questionnaire/questionnaire.page.html',
  styleUrls: ['../../vue/questionnaire/questionnaire.page.scss'],
})

export class QuestionnairePage implements OnInit{
  
  questionnaires: Questionnaires[];
  Crole= null;
  Cid= null;

  constructor(private listQ: ListQ,
              private Aroute: ActivatedRoute,
              private nav: NavController) {
  }
  //récupération de l'ID et du role du collaborateur
  ngOnInit(){
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.Crole = this.Aroute.snapshot.paramMap.get('Crole');
  }

  ionViewWillEnter(){
    this.questionnaires= this.listQ.getquestionnaires();
  }

  goToCreateQ(){
    this.nav.navigateForward("/qcreate/"+this.Cid);
  }

  goToAnsweringQ(Qid:number){
    this.nav.navigateForward("/qanswering/"+this.Cid+"/"+Qid);
  }

}
