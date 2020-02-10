import { Createq } from './question/createq';

export class Questionnaires {
    idcreateur:number;
    title: string;
    description: string;
    questions: Createq[];
    read:boolean;

    constructor(public id: number){
        this.title='';
        this.questions=[];
        this.read=false;
        this.idcreateur=0;
    }
}