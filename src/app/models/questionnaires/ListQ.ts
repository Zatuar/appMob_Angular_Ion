import { Questionnaires } from './questionnaire';
import { Createq } from './question/createq';


export class ListQ {
  private _questionnaires: Questionnaires[] = [
    {
      id:1,
      idcreateur: 1,
      title: 'App\'s Satisfaction',
      description: 'Hello everyone, we are the creator of the app, can you give us 30s of your time for answering to this questionnaire?',
      questions: Createq[2]= [
        {
          question:'What is your name?',
          qcm: false,
          QCManswer: [],
          constraints: [true,false]
        },
        {
          question:'Are you satisfy of the app?',
          qcm: true,
          QCManswer: ['Definitely, no','Can be better','Don\'t mind','Yes','Impress'],
          constraints: [true,false]
        }
      ],
      read: false
    }
  ] ;
  
  public getquestionnaires(): Questionnaires[] {
    return this._questionnaires;
  }
  public setquestionnaires(value: Questionnaires[]) {
    this._questionnaires = value;
  }
  public addQ(value: Questionnaires){
    this._questionnaires.push(value);
  }
}