import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateQ } from 'src/app/models/questionnaires/createQ';
import { ListQ } from 'src/app/models/questionnaires/ListQ';

@Component({
  selector: 'app-qinfo',
  templateUrl: '../../../vue/questionnaire/qinfo/qinfo.page.html',
  styleUrls: ['../../../vue/questionnaire/qinfo/qinfo.page.scss'],
})
export class QinfoPage {
  questionnaire: CreateQ;
  
  Qid = null;

  constructor(private listQ: ListQ,
              private ARoute: ActivatedRoute) {

  }
  
  ngOnInit() {
    this.Qid = this.ARoute.snapshot.paramMap.get('Qid');
    this.questionnaire= this.listQ.getquestionnaires()[this.Qid-1];
  }

}
