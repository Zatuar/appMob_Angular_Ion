import { Questionnaires } from './questionnaire';
import { Createq } from './question/createq';


export class ListQ {
  private _questionnaires: Questionnaires[] 
  
  public getquestionnaires(): Questionnaires[] {
    return this._questionnaires;
  }
  public setquestionnaires(value: any) {
    this._questionnaires = value;
  }
  public addQ(value: Questionnaires){
    this._questionnaires.push(value);
  }
}