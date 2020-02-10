import { Answeringq } from './question/answeringq';


export class AnsweringQ {
    answers: Answeringq[];
    
    constructor(public idanswerer: number,public idQ:number){
        this.answers=[];
    }
}