import { Feedbacks } from './feedback';


export class ListF {
  private _feedbacks: Feedbacks[] = [
    {
      id: 1,
      idsender: 0,
      anonymous: true,
      date: new Date(),
      title: "Acknoledgement",
      tags:["Thanks","Appreciated"],
      message: "Thanks to S&H for trusting us all along the project",
      read: false
    }
  ];
  public getfeedbacks(): Feedbacks[] {
    return this._feedbacks;
  }
  public setfeedbacks(value: Feedbacks[]) {
    this._feedbacks = value;
  }
  public addF(value: Feedbacks){
    this._feedbacks.push(value);
  }

}