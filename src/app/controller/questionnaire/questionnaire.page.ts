import { Component } from '@angular/core';
import { CreateQ } from 'src/app/models/questionnaires/createQ';
import { ListQ } from 'src/app/models/questionnaires/ListQ';

@Component({
  selector: 'app-questionnaire',
  templateUrl: '../../vue/questionnaire/questionnaire.page.html',
  styleUrls: ['../../vue/questionnaire/questionnaire.page.scss'],
})
export class QuestionnairePage {
  
  questionnaires: CreateQ[];
  
  constructor(private listQ: ListQ) {
  }

  ionViewWillEnter(){
    this.questionnaires= this.listQ.getquestionnaires();
  }

}
