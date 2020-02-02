import { Createq } from './question/createq';

export class CreateQ {
    questions: Createq[];
    read: boolean;
    qname: string;

    constructor(public id: number){
        this.qname='';
        this.questions=[];
        this.read= false;
    }
}