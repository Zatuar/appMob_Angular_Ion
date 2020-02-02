import { CreateF } from './createF';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class ListF {
  private _feedbacks: CreateF[] = [
    {
      id: 1,
      fname: 'Honor',
      to: 'ESIEA',
      message: 'Il a bien travaillé',
      tags: [
        'Team Spirit',
        'Comprehensive'
      ],
      anonymous: true,
      read: true
    },
    {
      id: 2,
      fname: 'Reported',
      to: 'Jack',
      message: 'Il n\'écoute personne pour prendre des décisions',
      tags: [
        'Blind',
        'Aggressive'
      ],
      anonymous: true,
      read: true
    },
    {
      id: 3,
      fname: 'Reported',
      to: 'ECE',
      message: 'Attention danger',
      tags: [
        'Double-edged',
        'Demotivate'
      ],
      anonymous: true,
      read: false
    }
  ];
  public getfeedbacks(): CreateF[] {
    return this._feedbacks;
  }
  public setfeedbacks(value: CreateF[]) {
    this._feedbacks = value;
  }
  public addF(value: CreateF){
    this._feedbacks.push(value);
  }

}