import { Component } from '@angular/core';
import { CreateQ } from 'src/app/models/questionnaires/createQ';
import { Createq } from 'src/app/models/questionnaires/question/createq';
import { ListQ } from 'src/app/models/questionnaires/ListQ';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-qcreate',
  templateUrl: '../../../vue/questionnaire/qcreate/qcreate.page.html',
  styleUrls: ['../../../vue/questionnaire/qcreate/qcreate.page.scss'],
})
export class QcreatePage {
  questionnaire: CreateQ;
  myQuestion= new Createq('');
  to:string='';
  myanswer: '';
  Cid: any;

  
  constructor(private nav: NavController,
              private Aroute: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.questionnaire=new CreateQ(this.Cid);
  }

  addQuestionToForm() {
    this.questionnaire.questions.push(this.myQuestion);
    //création d'une nouvelle question
    this.myQuestion=new Createq('');
  }
  addPossibleAnswerToQuestion() {
    this.myQuestion.QCManswer.push(this.myanswer);
    //réinitialisation
    this.myanswer='';
  }
  deleteQuestion(){
    this.questionnaire.questions.pop();
  }
  sendQ() {
    this.questionnaire.date= new Date();
    console.log(this.questionnaire);
    console.log(JSON.stringify(this.questionnaire));
    this.http.post('http://localhost:5000/create_questionnaire',this.questionnaire)
    .pipe(map(res => res))
    .subscribe(data => {
      console.log(status);
      console.log(data);
      

    })
    //console.log(this.questionnaire);
    //console.log('sended');
    this.nav.pop();
  }
}
