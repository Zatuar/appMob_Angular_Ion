import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListQ } from 'src/app/models/questionnaires/ListQ';
import { Questionnaires } from 'src/app/models/questionnaires/questionnaire';
import { AnsweringQ } from 'src/app/models/questionnaires/answeringQ';

@Component({
  selector: 'app-qanswering',
  templateUrl: '../../../vue/questionnaire/qanswering/qanswering.page.html',
  styleUrls: ['../../../vue/questionnaire/qanswering/qanswering.page.scss'],
})
export class QinfoPage {
  questionnaire: Questionnaires;
  type:number;
  Qid = null;
  answersQ:AnsweringQ;
  Cid:any;

  constructor(private listQ: ListQ,
              private ARoute: ActivatedRoute) {

  }
  
  ngOnInit() {
    this.Qid = this.ARoute.snapshot.paramMap.get('Qid');
    this.questionnaire= this.listQ.getquestionnaires()[this.Qid-1];
    this.answersQ=new AnsweringQ(this.Cid,this.questionnaire.id);
    console.log(this.questionnaire);
  }
  sendAnswer(){
    console.log("sended");
    //envoyer les réponses à la DB
  }
  typeAnswer(){
    switch(this.type){
      case 0:
        this.freeAnswer();
        break;
      case 1:
        this.multiQcm();
        break;
      case 2:
        this.uniqueQcm();
        break;
    }
  }
  
  uniqueQcm() {

  }
  multiQcm() {

  }
  freeAnswer() {

  }

}
