import { Component } from '@angular/core';
import { CreateQ } from 'src/app/models/questionnaires/createQ';
import { Createq } from 'src/app/models/questionnaires/question/createq';
import { ListQ } from 'src/app/models/questionnaires/ListQ';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qcreate',
  templateUrl: '../../../vue/questionnaire/qcreate/qcreate.page.html',
  styleUrls: ['../../../vue/questionnaire/qcreate/qcreate.page.scss'],
})
export class QcreatePage {
  questionnaire: CreateQ;
  myQuestion= new Createq('');
  to:string;
  myanswer: '';

  
  constructor(private listQ: ListQ,
              private nav: NavController) {
    this.questionnaire=new CreateQ(this.listQ.getquestionnaires().length);
  }

  changeCheckState(){ }
  addQuestionToForm() {
    console.log("Before pushing : "+this.myQuestion.title);
    console.log(this.questionnaire.questions);
    //this.questionnaire.questions.push(this.myQuestion);
    this.questionnaire.questions[this.questionnaire.questions.length]=this.myQuestion;
    console.log("After pushing : "+this.myQuestion.title);
    console.log(this.questionnaire.questions);
    //création d'une nouvelle question
    this.myQuestion=new Createq('');
  }
  addPossibleAnswerToQuestion() {
    console.log(this.myanswer);
    console.log(this.myQuestion.answer);
    this.myQuestion.answer.push(this.myanswer);
    //réinitialisation
    this.myanswer='';
  }
  deleteQuestion(){
    this.questionnaire.questions.pop();
  }
  sendQ() {
    this.listQ.addQ(this.questionnaire);
    console.log('sended');
    this.nav.pop();
  }
}
