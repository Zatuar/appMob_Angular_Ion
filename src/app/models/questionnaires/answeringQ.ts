import { Answeringq } from './question/answeringq';


export class AnsweringQ {
    answers: string[];
    i:number;
    
    constructor(public idanswerer: number,public idQ: number,size:number){
        this.answers= [];
    }
}