import { Component } from '@angular/core';
import { ListF } from 'src/app/models/feedbacks/ListF';
import { CreateF } from 'src/app/models/feedbacks/createF';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fcreate',
  templateUrl: '../../../vue/feedbacks/fcreate/fcreate.page.html',
  styleUrls: ['../../../vue/feedbacks/fcreate/fcreate.page.scss'],
})
export class FcreatePage {
  feedback: CreateF;
  tags:string;

  constructor(private listF: ListF,
              private nav: NavController) {
    this.feedback= new CreateF(listF.getfeedbacks().length);
  }

  changeCheckState() {}

  create(){
    this.feedback.tags=this.tags.split(',');
    this.feedback.id= this.listF.getfeedbacks().length+1;
    console.log(this.feedback);
    this.listF.addF(this.feedback);
    this.nav.pop();

  };

}
