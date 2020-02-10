import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListF } from 'src/app/models/feedbacks/ListF';
import { Feedbacks } from 'src/app/models/feedbacks/feedback';

@Component({
  selector: 'app-finfo',
  templateUrl: '../../../vue/feedbacks/finfo/finfo.page.html',
  styleUrls: ['../../../vue/feedbacks/finfo/finfo.page.scss'],
})
export class FinfoPage {

  feedback: Feedbacks;
  Fid = null;

  constructor(private listF: ListF,
    private ARoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.Fid = this.ARoute.snapshot.paramMap.get('Fid');
    this.feedback= this.listF.getfeedbacks()[this.Fid-1];
  }
}
