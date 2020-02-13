import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListQ } from 'src/app/models/questionnaires/ListQ';
import { Questionnaires } from 'src/app/models/questionnaires/questionnaire';
import { AnsweringQ } from 'src/app/models/questionnaires/answeringQ';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qanswering',
  templateUrl: '../../../vue/questionnaire/qanswering/qanswering.page.html',
  styleUrls: ['../../../vue/questionnaire/qanswering/qanswering.page.scss'],
})
export class QinfoPage {
  questionnaire: Questionnaires;
  type:number;
  Qid: any;
  answersQ: AnsweringQ;
  Cid: any;

  constructor(private listQ: ListQ,
              private ARoute: ActivatedRoute,
              private nav: NavController) {

  }
  
  ngOnInit() {
    this.Qid = this.ARoute.snapshot.paramMap.get('Qid');
    this.Cid = this.ARoute.snapshot.paramMap.get('Cid');
    this.questionnaire= this.listQ.getquestionnaires()[this.Qid-1];
    this.answersQ=new AnsweringQ(this.Cid,this.Qid,this.questionnaire.questions.length);
    console.log(this.questionnaire);
    console.log(this.answersQ);
  }
  sendAnswer(){
    this.questionnaire.read=true;
    console.log(this.answersQ);
    console.log("sended");
    this.nav.pop();
    //envoyer les réponses à la DB
  }
  typeAnswer(answer: string,multi: boolean){
    if(!multi){
      ///supprimer l'aciennce réponse

    }
    
  }

}
