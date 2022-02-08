import { Feedbacks } from './feedback';


export class ListF {
  private _feedbacks: Feedbacks[] 
  
  public getfeedbacks(): Feedbacks[] {
    return this._feedbacks;
  }
  public setfeedbacks(value: any) {
    this._feedbacks = value;
  }
  public addF(value: Feedbacks){
    this._feedbacks.push(value);
  }

}