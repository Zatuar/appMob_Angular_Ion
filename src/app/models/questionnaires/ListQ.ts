import { CreateQ } from './createQ';
import { Createq } from './question/createq';

export class ListQ {
  private _questionnaires: CreateQ[] = [
    {
      id: 1,
      qname: 'Nom & front',
      questions: [
      {
        title: 'Quel est votre nom?',
        answer:[],
        qcm: false
      },
      {
        title: 'Comment trouvez vous le front-end de l\'appli?',
        answer:[
          'horrible',
          'bad',
          'normal',
          'great',
          'fantastique'
        ],
        qcm: true
      }
    ],
      read: true
    },
    {
      id:2,
      qname: 'Prenom & back',
      questions: [
      {
        title: 'Quel est votre prénom?',
        answer:[],
        qcm: false,
      },
      {
        title: 'Comment trouvez vous le back-end de l\'appli?',
        answer:[
          'horrible',
          'bad',
          'normal',
          'great',
          'fantastique'
        ],
        qcm: true
      }
    ],
      read: false
    },
    {
      id:3,
      qname: 'Role & BdD',
      questions: [
      {
        title: 'Quel est votre rôle?',
        answer:[],
        qcm: false
      },
      {
        title: 'Comment trouvez vous la base de donnée de l\'appli?',
        answer:[
          'horrible',
          'bad',
          'normal',
          'great',
          'fantastique'
        ],
        qcm: true
      }
    ],
      read: false
    }
  ] ;
  
  public getquestionnaires(): CreateQ[] {
    return this._questionnaires;
  }
  public setquestionnaires(value: CreateQ[]) {
    this._questionnaires = value;
  }
  public addQ(value: CreateQ){
    this._questionnaires.push(value);
  }
}