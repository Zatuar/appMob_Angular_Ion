import { Createq } from './question/createq';

export class CreateQ {
    title: string;
    description: string;
    date: Date;
    destinataire: number[];
    questions: Createq[];

    constructor(public idcreateur: number){
        this.title='';
        this.questions=[];
        this.date= new Date();
        this.destinataire=[];
    }
}