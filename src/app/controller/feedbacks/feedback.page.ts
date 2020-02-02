import { Component } from '@angular/core';
import { CreateF } from 'src/app/models/feedbacks/createF';
import { ListF } from 'src/app/models/feedbacks/ListF';

@Component({
  selector: 'app-feedback',
  templateUrl: '../../vue/feedbacks/feedback.page.html',
  styleUrls: ['../../vue/feedbacks/feedback.page.scss'],
})
export class FeedbackPage {
  
  feedbacksList: CreateF[];
  
  constructor(private listF: ListF) {}

  ionViewWillEnter(){
    this.feedbacksList= this.listF.getfeedbacks().slice();
  }
}
