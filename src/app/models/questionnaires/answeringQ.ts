import { Answeringq } from './answer/answeringq';


export class AnsweringQ {
    answers: Answeringq[];
    
    constructor(public idanswerer: number,public idQ:number){
        this.answers=[];
    }
}