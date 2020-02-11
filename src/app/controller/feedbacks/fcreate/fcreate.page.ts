import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CreateF } from 'src/app/models/feedbacks/createF';

@Component({
  selector: 'app-fcreate',
  templateUrl: '../../../vue/feedbacks/fcreate/fcreate.page.html',
  styleUrls: ['../../../vue/feedbacks/fcreate/fcreate.page.scss'],
})
export class FcreatePage implements OnInit{
  feedback: CreateF;
  tags:string;
  to:string='';
  Cid: any;

  constructor(private nav: NavController,
              private Aroute: ActivatedRoute) {

  }
  ngOnInit() {
    this.Cid = this.Aroute.snapshot.paramMap.get('Cid');
    this.feedback= new CreateF(this.Cid);
  }

  changeCheckState() {}

  create(){
    this.feedback.tags=this.tags.split(',');
    this.feedback.to=this.to.split(',');
    this.feedback.date=new Date();
    console.log(this.feedback);
    this.nav.pop();

  };

}
