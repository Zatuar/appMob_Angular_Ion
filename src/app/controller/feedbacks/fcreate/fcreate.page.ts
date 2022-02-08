import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CreateF } from 'src/app/models/feedbacks/createF';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-fcreate',
  templateUrl: '../../../vue/feedbacks/fcreate/fcreate.page.html',
  styleUrls: ['../../../vue/feedbacks/fcreate/fcreate.page.scss'],
})
export class FcreatePage implements OnInit{
  feedback: CreateF;
  tags:string='';
  to:string='';
  Cid: any;

  constructor(private nav: NavController,
              private Aroute: ActivatedRoute,
              private http: HttpClient) {

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

    this.feedback.date= new Date();
    console.log(this.feedback);
    console.log(JSON.stringify(this.feedback));
    this.http.post('http://localhost:5000/create_feedback',this.feedback)
    .pipe(map(res => res))
    .subscribe(data => {
      console.log(status);
      console.log(data);
      

    })
    this.nav.pop();

  };

}
