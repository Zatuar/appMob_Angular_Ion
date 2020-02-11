import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
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
  Cid:any;
  
  constructor(private listF: ListF,
              private nav: NavController,
              private Aroute: ActivatedRoute) {}

  ionViewWillEnter(){
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.feedbacksList= this.listF.getfeedbacks().slice();
  }
  change(){
    this.receved=!this.receved;
  }
  goToFeedbackCreation(){
    this.nav.navigateForward("/fcreate/"+this.Cid);
  }
}
