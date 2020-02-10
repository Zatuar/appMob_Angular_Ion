import { Component } from '@angular/core';
import { ListF } from 'src/app/models/feedbacks/ListF';
import { Feedbacks } from 'src/app/models/feedbacks/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: '../../vue/feedbacks/feedback.page.html',
  styleUrls: ['../../vue/feedbacks/feedback.page.scss'],
})
export class FeedbackPage {
  receved:boolean = true;
  feedbacksList: Feedbacks[];
  
  constructor(private listF: ListF) {}

  ionViewWillEnter(){
    this.feedbacksList= this.listF.getfeedbacks().slice();
  }
  change(){
    this.receved=!this.receved;
  }
}
